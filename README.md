# meetingheatmap
AIS危险度热力图

## heapmap  
url: /heapmap/{file}/{radius}/{max}  
example: heatmap/danger5.txt/1.5/1  
支持多文件输入  
example: heatmap/danger1.txt&danger2.txt&danger3.txt&danger4.txt&danger5.txt/1.5/1  
数据格式: lng,lat,value\r\n  
数据存储: \public\data  

## doorline  
url: /doorline/{file}  
example: /doorline/doorline2.txt  
数据格式: lng,lat-lng,lat...\r\n  
数据存储: \public\data  
