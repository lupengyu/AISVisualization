<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <style type="text/css">
            body, html{width: 100%;height: 100%;margin:0;font-family:"微软雅黑";}
            #allmap {height:100%; width: 100%;}
            #control{width:100%;}
        </style>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZwyG27rzm1SC2ChCNy4LpNf1VGOEOr4p"></script>
        <title>门线</title>
    </head>
    <body>
        <?php
            echo "
            <script>

                var tracklist = ".$tracklist.";

            </script>
            ";
        ?>
        <div id="allmap"></div>
        <script type="text/javascript">
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(118.202035, 24.38942);
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom();

            for (var i = 1; i < tracklist.length; i++) {
                var list = new Array(); 
                for (var j = 0; j < tracklist[i].length; j++) {
                    list[j] = new BMap.Point(tracklist[i][j].lng, tracklist[i][j].lat)
                }
                var polyline = new BMap.Polyline(list, {strokeColor:"red", strokeWeight:0.5, strokeOpacity:0.5});
                map.addOverlay(polyline);//增加折线
            }

            var list = new Array(); 
            for (var j = 0; j < tracklist[0].length; j++) {
                list[j] = new BMap.Point(tracklist[0][j].lng, tracklist[0][j].lat)
            }
            var polyline = new BMap.Polyline(list, {strokeColor:"blue", strokeWeight:5, strokeOpacity:0.5});
            map.addOverlay(polyline);//增加折线
        </script>
    </body>
</html>
