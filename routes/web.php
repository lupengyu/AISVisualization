<?php
Route::any('/{file}/{radius}/{max}', 'IndexController@index')->name('index');