<?php
Route::any('heatmap/{file}/{radius}/{max}', 'IndexController@heatmap')->name('heatmap');
Route::any('doorline/{file}', 'IndexController@doorline')->name('doorline');
Route::any('trajectory/{file}', 'IndexController@trajectory')->name('trajectory');
Route::any('pointlist/{file}', 'IndexController@pointlist')->name('pointlist');