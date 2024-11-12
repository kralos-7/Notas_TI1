@echo off
echo Example { Load balancing } 

docker run --rm -dP -v D:\code\balanceo\server_0\index.html:/usr/share/nginx/html/index.html --network mynet nginx
docker run --rm -dP -v D:\code\balanceo\server_1\index.html:/usr/share/nginx/html/index.html --network mynet nginx
docker run --rm -dP -v D:\code\balanceo\server_2\index.html:/usr/share/nginx/html/index.html --network mynet nginx
docker run --rm -dP -v D:\code\balanceo\server_3\index.html:/usr/share/nginx/html/index.html --network mynet nginx

docker run --rm -dP -v D:\code\balanceo\default.conf:/etc/nginx/conf.d/default.conf --network mynet nginx

exit