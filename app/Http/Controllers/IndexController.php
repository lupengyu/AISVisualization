<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Redirect;
use Mail;
use PHPExcel;
use PHPExcel_IOFactory;
use PHPExcel_Cell;
use Excel;
use GuzzleHttp\Client;

class IndexController extends Controller {
    public function index($file = '', $radius = 6, $max = 100) {
        $files = explode("&",$file);
        $points = [];
        for ($i = 0; $i < sizeof($files); $i += 1) {
            $data = fopen('data/'.$files[$i], 'r');
            while(!feof($data)) {
                $str = fgets($data);
                $datas = explode(",",$str);
                $point = ['lng'=>$datas[0]+0.0105, 'lat'=>$datas[1]+0.0035, 'count'=>explode("\r\n",$datas[2])[0]];
                array_push($points, $point);
            }
            fclose($data);
        }

        return view('ais.index',
            [
                'points' => json_encode($points),
                'radius' => $radius,
                'max'    => $max,
            ]
        );
    }
}