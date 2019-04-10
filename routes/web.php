<?php
Route::any('heatmap/{file}/{radius}/{max}', 'IndexController@heatmap')->name('heatmap');
Route::any('doorline/{file}', 'IndexController@doorline')->name('doorline');