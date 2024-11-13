# APP [ mongo y nodejs ]

Sigue estos pasos para administrar la app correctamente:

1. Ejecutar el dockerfile de mongo
    ```bash
    # Construye una nueva imagen de mongo
    docker build -f dockerfile.mongo -t mongoserver .
2. Creando contenedor apartir de la imagen creada en el paso 1
    ```bash
    # Instancia un contendor temporal
    docker run --rm --name=mserver -d -p 27017:27017 mongoserver
3. Ejecutar el dockerfile de nodejs
    ```bash
    # Construye una nueva imagen de node
    docker build -f dockerfile.nodejs -t appconnode .
4. Creando contenedor apartir de la imagen creada en el paso 1
    ```bash
    # Instancia un contendor temporal
    docker run --rm --name=appnodejs -d -p 3000:3000 appconnode
