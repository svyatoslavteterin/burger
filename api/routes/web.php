<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});


Route::get('/generate', function () {
    $url = "http://89.223.25.82:3030/api/menu/getMenuFront";

    $json = json_decode(file_get_contents($url), true);


    $images = [];
    $presets = [
        0 => [
            'width' => 430,
            'height' => 275,
            'crop' => 0
        ],
        1 => [
            'width' => 190,
            'height' => 250,
            'crop' => 1
        ],
        2 => [
            'width' => 46,
            'height' => 46,
            'crop' => 1
        ]

    ];

    foreach ($json['menu'] as $categ) {
        foreach ($categ['categs'] as $food) {

            if (!empty($food['ImageName'])) {
                $images[$food['id']] = $food['ImageName'];
            }
        }
    }

    foreach ($images as $id => $image) {

        try {
            $imageSource = file_get_contents('http://89.223.25.82/_img/Rest/' . $image);
        } catch (\Throwable $exception) {
            continue;
        }


        $img = Image::make($imageSource);

        foreach ($presets as $preset) {
            $tmpImg = clone $img;
            if ($preset['crop']) {
                $tmpImg->fit($preset['width'], $preset['height'], function ($constraint) {
                    $constraint->upsize();
                });
            } else {
                $tmpImg->widen($preset['width'])->fit($preset['width'], $preset['height']);
            }


            $path = public_path('images/' . $id);
            if (!File::exists($path)) File::makeDirectory($path, 0777);

            $path .= '/' . $preset['width'] . '-' . $preset['height'];
            if (!File::exists($path)) File::makeDirectory($path, 0777);

            $tmpImg->encode('jpg')->save($path . '/' . $image);
        }


    }
});
