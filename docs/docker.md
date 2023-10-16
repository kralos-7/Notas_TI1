# Docker

## Inciarlo
```bash
$ sudo systemctl start docker
```
## Check that you have a working install
```bash
$ docker info
```
## Download an ubuntu image
```bash
$ docker pull ubuntu
$ docker ps # Lists only running containers
$ docker ps -a # Lists all containers
```

## Copiando ficheros locales a un contenedor Docker
```bash
$ docker cp archivo_a_copiar nombre_del_contenedor:/Directorio_destino
$ docker cp nombre_del_contenedor:/ruta/hacia/el/fichero ./fichero
```

## Docker LEMP
```bash
$ mkdir html
$ vi html/index.php
$ ls html/
index.php

sudo docker run --name=lemp -dP -v $PWD/html:/var/www/html linuxconfig/lemp
```
### The both local ports can now be used to access both MariaDB and Nginx services
```bash
sudo docker port lemp
80/tcp -> 0.0.0.0:49156
3306/tcp -> 0.0.0.0:49155
```
### Nginx Access
http://localhost:49156

### MariaDB Access
```bash
mysql -uadmin -ppass -h 127.0.0.1 -P49155
```
### Reset MariaDB user password
```bash
SET PASSWORD FOR 'admin'@'%' = PASSWORD('123');
```
### Restart lemp stack
```bash
sudo docker exec lemp service supervisor restart
```
### Container Access
```bash
sudo docker exec -it lemp /bin/bash
```
