<!DOCTYPE html>  
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ZwyG27rzm1SC2ChCNy4LpNf1VGOEOr4p"></script>
        <script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
        <title>热力图功能示例</title>
        <style type="text/css">
            ul,li{list-style: none;margin:0;padding:0;float:left;}
            html{height:100%}
            body{height:100%;margin:0px;padding:0px;font-family:"微软雅黑";}
            #container{height:100%;width:100%;}
            #r-result{width:100%;}
        </style>	
    </head> 
    
    <body>
        <?php
            echo "
            <script>

                var points = ".$points.";
                var radiusNum = ".$radius.";
                var maxNum = ".$max.";

            </script>
            ";
        ?>
        <div id="container"></div> 
        <script type="text/javascript"> 
            var map = new BMap.Map("container");
            // 创建地图实例  
            var point = new BMap.Point(118.202035, 24.38942);
            // 创建点坐标  
            map.centerAndZoom(point, 12);
            // 初始化地图，设置中心点坐标和地图级别  
            map.enableScrollWheelZoom(true);     
            //开启鼠标滚轮缩放
            // var mapStyle={  style : "midnight" }  
            // map.setMapStyle(mapStyle);

            console.log("hahaha")
            if(!isSupportCanvas()){
                alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
            }

            heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":radiusNum});
            map.addOverlay(heatmapOverlay);
            heatmapOverlay.setDataSet({data:points,max:maxNum});

            function setGradient(){
                /*格式如下所示:
                {
                    0:'rgb(102, 255, 0)',
                    .5:'rgb(255, 170, 0)',
                    1:'rgb(255, 0, 0)'
                }*/
                var gradient = {};
                var colors = document.querySelectorAll("input[type='color']");
                colors = [].slice.call(colors,0);
                colors.forEach(function(ele){
                    gradient[ele.getAttribute("data-key")] = ele.value; 
                });
                heatmapOverlay.setOptions({"gradient":gradient});
            }
            //判断浏览区是否支持canvas
            function isSupportCanvas(){
                var elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            }
        </script>  
    </body>  
</html>