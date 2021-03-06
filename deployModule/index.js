const CMD = require('./cmd');
const request = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const argv = require('optimist').argv;

const deployStart = async (params) => {
  const isWin = process.platform === "win32";
  console.log('Win32:', isWin);
  if (isWin){
    // чтобы можно было деплоить из-под Win,
    // необходимо прописать 7z в PATH (Переменные среды)
    // и вручную после yarn build в первый раз создать архив в папке dist:
    // cd ./dist/
    // 7z a -r -tzip build.zip ./*
    await CMD.run(`
    cd ./dist/
    rm -f build.zip
    7z a -r -tzip build.zip ./*
    `);
  }else{
    await CMD.run(`
    cd ./dist/
    rm -f build.zip
    zip -r build.zip ./*
    `);
  }
  

  const data = new FormData();
  data.append('sampleFile', fs.createReadStream('./dist/build.zip'), 'build.zip');
  data.append('module', params.module);
  data.append('server', params.server);
  // data.append('file2', fs.createReadStream('./image2.jpeg'), 'image2.jpeg');

  const options = {
    method: 'POST',
    url: 'http://5.188.52.158:7070/deploy',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    },
    data
  };

  return await request(options);
};

if (!argv.module) return 'не указан модуль';
if (!argv.server) return 'не указан сервер';

deployStart({
  module: argv.module,
  server: argv.server
}).then((res) => {
  console.log('response --> ', res.data);
  if (!res.data.error) {
    console.log(`Модуль ${argv.module} загружен на сервер ${argv.server}`);
  }
});
