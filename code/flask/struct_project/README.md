# Estructura propuesta para desarrollar la practica

* Archivo README.md - Descripción del proyecto
* Archivo requirements.txt - Dependencias de la APP
* Archivo config.py - Configuración de la APP
* Archivo run.py - Lanzar la APP

* Carpeta SRC - Código completo de la APP

## Subcarpetas en SRC

- database: funcinoes para la conexion(s) a la(s) base(s) de datos
- models: operaciones en las distintas tablas
- routes: rutas de el acceso a las diferentes partes de la APP
- services: funciones para cada tarea de la APP
- utils: funciones para combinar modeles y servicios (algo como controladores)
- test: pruebas unitarias