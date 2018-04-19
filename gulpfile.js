"use strict";

var autoprefixerList = [
    'Chrome >= 45',
    'Firefox ESR',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 9',
    'Safari >= 9',
    'Android >= 4.4',
    'Opera >= 30'
];


require('babel-polyfill');

var browserify = require('browserify');
var babelify = require("babelify");

var gulp = require('gulp');
var modernizr = require('gulp-modernizr');



const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const log = require('gulplog');
const vueify = require('vueify');
const changed = require('gulp-changed');
const ngAnnotate = require('gulp-ng-annotate'); // Just as an example


var bsConfig = require("gulp-bootstrap-configurator");

var fs        = require('fs');
var path      = require('path');
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var VueModule = require('gulp-vue-module');





var path = {
    build: {
        html:  'public/',
        js:    'public/static/js/',
        css:   'public/static/css/',
        img:   'public/static/img/',
        images: 'public/assets/images/',
        fonts: 'public/static/fonts/'
    },
    src: {
        html:  'app/*.html',
        js:    'app/js/app.js',
        style: 'app/scss/app.scss',
        css:   'app/css/**/*.css',
        img:   'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*',
        images: 'app/images/**/*.*',
        vue:    'app/js/**/*.vue'
    },
    watch: {
        html:  'app/**/*.html',
        js:    'app/js/**/*.js',
        css:   'app/scss/**/*.scss',
        img:   'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*',
        images: 'app/images/**/*.*'
    },
    clean:     './public'
};

/* настройки сервера */
var config = {
    server: {
        baseDir: './public'
    },
    notify: false
};




const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');


var sass = require('gulp-sass');

var useref = require('gulp-useref');

var cssnano = require('gulp-cssnano');

var imagemin = require('gulp-imagemin');

var cache = require('gulp-cache');

var plumber = require('gulp-plumber'); // модуль для отслеживания ошибок

var rigger = require('gulp-rigger'); // модуль для импорта содержимого одного файла в другой

var del = require('del');

var runSequence = require('run-sequence');

var  webserver = require('browser-sync'); // сервер для работы и автоматического обновления страниц = require('browser-sync').create();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

var sprity = require('sprity');

var jpegrecompress = require('imagemin-jpeg-recompress') // плагин для сжатия jpeg
var pngquant = require('imagemin-pngquant'); // плагин для сжатия png



gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'public'
        },
    })
});

gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','app/scss/**/*.scss',path.src.css])
        .pipe(sass()) // Using gulp-sass
        .pipe(ngAnnotate())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});





gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('public'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('public/images'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
});

gulp.task('clean:public', function() {
    return del.sync('public/css/**/*.css');
});

gulp.task('build', function (callback) {
    runSequence('clean:public',
        ['sass', 'useref', 'images', 'fonts','vue'],
        callback
    )
});



// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
    return sprity.src({
        src: './app/icons/**/*.{png,jpg}',
        style: './sprite.css',
        // ... other optional options
        // for example if you want to generate scss instead of css
        processor: 'sass', // make sure you have installed sprity-sass
    })
        .pipe(gulpif('*.png', gulp.dest('./public/img/'), gulp.dest('./public/css/')))
});

gulp.task('modernizr', function() {
    return gulp.src(SRC.js)
        .pipe(modernizr())
        .pipe(uglify())
        .pipe(gulp.dest("public/"))
});

// запуск сервера
gulp.task('webserver', function () {
    webserver(config);
});

// сбор html
gulp.task('html:build', function () {
    gulp.src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        .pipe(webserver.reload({stream: true})); // перезагрузка сервера
});

// сбор стилей
gulp.task('css:build', function () {
    gulp.src(path.src.style) // получим app.scss
        .pipe(plumber()) // для отслеживания ошибок
        .pipe(sourcemaps.init()) // инициализируем sourcemap
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer({ // добавим префиксы
            browsers: autoprefixerList
        }))
        .pipe(cssnano()) // минимизируем CSS
        .pipe(sourcemaps.write('./')) // записываем sourcemap
        .pipe(gulp.dest(path.build.css)) // выгружаем в build
        .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

// сбор js
gulp.task('js:build', function () {

    var b = browserify({
        entries: path.src.js,
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [babelify,vueify]
    });

    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

gulp.task('es6-compile', function() {
    var b = browserify({
        entries: gulp.dest(path.src.js),
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [vueify]
    });
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({stream: true})); // перезагрузим сервер
});

// перенос шрифтов
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

// обработка картинок
gulp.task('img:build', function () {
    gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
});
// обработка картинок
gulp.task('images:build', function () {
    gulp.src(path.src.images) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ])))
        .pipe(gulp.dest(path.build.images)); // выгрузка готовых файлов
});

// удаление каталога build
gulp.task('clean:build', function () {
    del.sync(path.clean);
});

// очистка кэша
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// сборка
gulp.task('build', [
    'clean:build',
    'html:build',
    'css:build',
    'js:build',
    'fonts:build',
    'images:build',
    'img:build'
]);
// запуск задач при изменении файлов
gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.css, ['css:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['img:build']);
    gulp.watch(path.watch.images, ['images:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
});

gulp.task('vue', function() {
    return gulp.src(path.src.vue)
        .pipe(VueModule({
            debug : true
        }))
        .pipe(rename({extname : ".js"}))
        .pipe(gulp.dest(path.build.js));
});

// задача по умолчанию
gulp.task('default', [
    'clean:build',
    'build',
    'webserver',
    'watch'
]);
