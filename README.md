# AISVisualization  
AIS数据可视化

## heapmap 热力图  
url: /heapmap/{file}/{radius}/{max}  
example: /heatmap/danger5.txt/1.5/1  
支持多文件输入  
example: /heatmap/danger1.txt&danger2.txt&danger3.txt&danger4.txt&danger5.txt/1.5/1  
数据格式: lng,lat,value\r\n  
数据存储: \public\data  

## doorline 门线可视化  
url: /doorline/{file}  
example: /doorline/doorline2.txt  
数据格式: lng,lat-lng,lat...\r\n, 其中第一行为门线数据  
数据存储: \public\data  

## trajectory 船舶航迹可视化  
url: /trajectory/{file}  
example: /trajectory/trajectory1.txt  
支持多文件输入  
example: /trajectory/trajectory1.txt&trajectory2.txt  
数据格式: lng,lat-lng,lat...  
数据存储: \public\data  

## pointlist 船舶航迹点阵可视化  
url: /pointlist/{file}  
example: /pointlist/trajectory1.txt  
支持多文件输入  
example: /pointlist/trajectory1.txt&trajectory2.txt  
数据格式: lng,lat-lng,lat...  
数据存储: \public\data  
