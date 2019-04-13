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
        <title>船舶航迹点阵</title>
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
            // 编写自定义函数,创建标注
            function addMarker(point,label){
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                marker.setLabel(label);
            }
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(118.202035, 24.38942);
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom();

            // var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
            //     scale: 0.2,//图标缩放大小
            //     strokeColor:'#fff',//设置矢量图标的线填充颜色
            //     strokeWeight: '0.2',//设置线宽
            // });
            // var icons = new BMap.IconSequence(sy, '10', '30');

            for (var i = 0; i < tracklist.length; i++) {
                var list = new Array(); 
                for (var j = 0; j < tracklist[i].length; j++) {
                    list[j] = new BMap.Point(tracklist[i][j].lng, tracklist[i][j].lat)
                    var label = new BMap.Label((i+1) + "-" + (j+1),{offset:new BMap.Size(20,-10)});
                    addMarker(list[j],label);
                }
                var polyline = new BMap.Polyline(list, {strokeColor:"red", strokeWeight:2, strokeOpacity:0.5});
                // var polyline =new BMap.Polyline(list, {
                //     enableEditing: false,//是否启用线编辑，默认为false
                //     enableClicking: true,//是否响应点击事件，默认为true
                //     icons:[icons],
                //     strokeWeight:'0.5',//折线的宽度，以像素为单位
                //     strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
                //     strokeColor:"#18a45b" //折线颜色
                // });
                map.addOverlay(polyline);//增加折线

                // var point1 = new BMap.Point(tracklist[i][0].lng, tracklist[i][0].lat);
                // var label1 = new BMap.Label("start"+(i+1),{offset:new BMap.Size(20,-10)});
                // var point2 = new BMap.Point(tracklist[i][tracklist[i].length-1].lng, tracklist[i][tracklist[i].length-1].lat);
                // var label2 = new BMap.Label("end"+(i+1),{offset:new BMap.Size(20,-10)});
                // addMarker(point1,label1);
                // addMarker(point2,label2);
            }
        </script>
    </body>
</html>
