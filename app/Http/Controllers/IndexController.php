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
    public function heatmap($file = '', $radius = 6, $max = 100) {
        $files = explode("&",$file);
        $points = [];
        for ($i = 0; $i < sizeof($files); $i += 1) {
            $data = fopen('data/'.$files[$i], 'r');
            while(!feof($data)) {
                $str = fgets($data);
                $datas = explode(",",$str);
                if (sizeof($datas) < 3) {
                    continue;
                }
                $point = ['lng'=>$datas[0]+0.0105, 'lat'=>$datas[1]+0.0035, 'count'=>explode("\r\n",$datas[2])[0]];
                array_push($points, $point);
            }
            fclose($data);
        }

        return view('ais.heatmap',
            [
                'points' => json_encode($points),
                'radius' => $radius,
                'max'    => $max,
            ]
        );
    }

    public function doorline($file = '') {
        $data = fopen('data/'.$file, 'r');
        $tracklist = [];
        while(!feof($data)) {
            $str = fgets($data);
            if ($str == "") {
                continue;
            }
            $positions = explode("-",$str);
            $positions[sizeof($positions) - 1] = explode("\r\n",$positions[sizeof($positions) - 1])[0];
            $points = [];
            for ($i = 0; $i < sizeof($positions); $i ++) {
                $pre = explode(",",$positions[$i]);
                $point = ['lng'=>$pre[0]+0.0112, 'lat'=>$pre[1]+0.0035];
                array_push($points, $point);
            }
            array_push($tracklist, $points);
        }
        
        fclose($data);
        return view('ais.doorline',
            [
                'tracklist' => json_encode($tracklist),
            ]
        );
    }

    public function trajectory($file = '') {
        $files = explode("&",$file);
        $tracklist = [];
        for ($i = 0; $i < sizeof($files); $i += 1) {
            $data = fopen('data/'.$files[$i], 'r');
            $str = fgets($data);
            $positions = explode("-",$str);
            $positions[sizeof($positions) - 1] = explode("\r\n",$positions[sizeof($positions) - 1])[0];
            $points = [];
            for ($j = 0; $j < sizeof($positions); $j ++) {
                $pre = explode(",",$positions[$j]);
                $point = ['lng'=>$pre[0]+0.0112, 'lat'=>$pre[1]+0.0035];
                array_push($points, $point);
            }
            fclose($data);
            array_push($tracklist, $points);
        }
        return view('ais.trajectory',
            [
                'tracklist' => json_encode($tracklist),
            ]
        );
    }
}