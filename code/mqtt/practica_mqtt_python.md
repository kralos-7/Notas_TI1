# Práctica MQTT con Python y Paho MQTT

## 1. Objetivo

Crear una comunicación MQTT básica utilizando Python y la biblioteca **Paho MQTT**.

Al finalizar la práctica tendremos:

- Un **Broker MQTT** usando Mosquitto.
- Un programa **Publisher** escrito en Python.
- Un programa **Subscriber** escrito en Python.
- Comunicación mediante un **Topic** MQTT.
- Un entorno virtual de Python para mantener aisladas las dependencias.

La estructura final será:

```text
mqtt-python/
├── .venv/
├── publisher.py
├── subscriber.py
├── requirements.txt
└── .gitignore
```

---

# 2. Crear el directorio del proyecto

Crear un directorio para la práctica:

```bash
mkdir mqtt-python
cd mqtt-python
```

Comprobar el directorio actual:

```bash
pwd
```

Listar los archivos:

```bash
ls
```

---

# 3. Crear el entorno virtual

Crear un entorno virtual llamado `.venv`:

```bash
python -m venv .venv
```

Esto crea un entorno independiente de Python para nuestro proyecto.

La estructura será:

```text
mqtt-python/
└── .venv/
```

---

# 4. Activar el entorno virtual

En Linux:

```bash
source .venv/bin/activate
```

El prompt de la terminal debe mostrar algo parecido a:

```text
(.venv) usuario@pc:~/mqtt-python$
```

El texto `(.venv)` indica que el entorno virtual está activo.

---

# 5. Comprobar Python

Comprobar la versión:

```bash
python --version
```

Comprobar qué Python estamos utilizando:

```bash
which python
```

Debe aparecer una ruta similar a:

```text
/home/usuario/mqtt-python/.venv/bin/python
```

Esto confirma que estamos utilizando el Python del entorno virtual.

---

# 6. Actualizar pip

Actualizar el administrador de paquetes:

```bash
python -m pip install --upgrade pip
```

Comprobar:

```bash
pip --version
```

---

# 7. Instalar Paho MQTT

Instalar la biblioteca:

```bash
pip install paho-mqtt
```

Comprobar la instalación:

```bash
pip show paho-mqtt
```

También podemos comprobar que Python puede importar la biblioteca:

```bash
python -c "import paho.mqtt.client; print('Paho MQTT funcionando')"
```

Debe aparecer:

```text
Paho MQTT funcionando
```

---

# 8. Guardar las dependencias

Guardar los paquetes utilizados por el proyecto:

```bash
pip freeze > requirements.txt
```

El archivo `requirements.txt` permite instalar posteriormente las mismas dependencias:

```bash
pip install -r requirements.txt
```

---

# 9. Configurar el Broker MQTT

Para esta práctica utilizaremos **Mosquitto** como broker.

Utilizaremos el puerto:

```text
1887
```

Iniciar Mosquitto:

```bash
mosquitto -p 1887
```

El broker debe permanecer ejecutándose.

Podemos comprobar que está escuchando:

```bash
ss -lntp | grep 1887
```

> Si Mosquitto está configurado mediante un archivo de configuración, también puede utilizarse ese archivo en lugar de `-p 1887`.

---

# 10. Conceptos básicos

En MQTT participan principalmente tres elementos:

```text
                 MQTT BROKER
                localhost:1887
                     │
          ┌──────────┴──────────┐
          │                     │
      PUBLISHER             SUBSCRIBER
       publica                 recibe
          │                     ▲
          └────── TOPIC ────────┘
             iot/curso/datos
```

## Publisher

Es el programa que **envía/publica** información.

En nuestra práctica:

```text
publisher.py
```

## Subscriber

Es el programa que **recibe** información de un topic.

En nuestra práctica:

```text
subscriber.py
```

## Broker

Es el intermediario que recibe los mensajes y los distribuye a los clientes suscritos.

Utilizaremos:

```text
Mosquitto
```

## Topic

Es el canal lógico utilizado para organizar los mensajes.

Utilizaremos:

```text
iot/curso/datos
```

---

# 11. Crear el Publisher

Crear el archivo:

```bash
nano publisher.py
```

Código:

```python
import paho.mqtt.client as mqtt

BROKER = "localhost"
PORT = 1887
TOPIC = "iot/curso/datos"


# Crear cliente MQTT
cliente = mqtt.Client()

# Conectarse al broker
cliente.connect(BROKER, PORT, 60)

print("===================================")
print("          MQTT PUBLISHER")
print("===================================")
print(f"Broker : {BROKER}:{PORT}")
print(f"Topic  : {TOPIC}")
print()
print("Escribe un dato para publicarlo.")
print("Escribe 'salir' para terminar.")
print()

try:
    while True:

        dato = input("Dato > ")

        if dato.lower() == "salir":
            break

        if dato.strip() == "":
            continue

        resultado = cliente.publish(TOPIC, dato)

        if resultado.rc == mqtt.MQTT_ERR_SUCCESS:
            print(f"✓ Publicado: {dato}")
        else:
            print(f"✗ Error al publicar: {resultado.rc}")

except KeyboardInterrupt:
    print("\nInterrumpido por el usuario.")

finally:
    cliente.disconnect()
    print("Desconectado del broker.")
```

Guardar el archivo.

Ejecutar:

```bash
python publisher.py
```

Ejemplo:

```text
===================================
          MQTT PUBLISHER
===================================
Broker : localhost:1887
Topic  : iot/curso/datos

Escribe un dato para publicarlo.
Escribe 'salir' para terminar.

Dato > Hola MQTT
✓ Publicado: Hola MQTT

Dato > 25
✓ Publicado: 25

Dato > temperatura=28.5
✓ Publicado: temperatura=28.5

Dato > humedad=72
✓ Publicado: humedad=72

Dato > salir
Desconectado del broker.
```

---

# 12. Crear el Subscriber

Crear el archivo:

```bash
nano subscriber.py
```

Código:

```python
import paho.mqtt.client as mqtt

BROKER = "localhost"
PORT = 1887
TOPIC = "iot/curso/datos"


# Función que se ejecuta cuando llega un mensaje
def cuando_llega_mensaje(cliente, userdata, mensaje):

    dato = mensaje.payload.decode()

    print(f"Mensaje recibido: {dato}")
    print(f"Topic: {mensaje.topic}")
    print()


# Crear cliente MQTT
cliente = mqtt.Client()

# Registrar función para mensajes recibidos
cliente.on_message = cuando_llega_mensaje

# Conectarse al broker
cliente.connect(BROKER, PORT, 60)

# Suscribirse al topic
cliente.subscribe(TOPIC)

print("===================================")
print("         MQTT SUBSCRIBER")
print("===================================")
print(f"Broker : {BROKER}:{PORT}")
print(f"Topic  : {TOPIC}")
print()
print("Esperando mensajes...")
print("Presiona Ctrl+C para terminar.")
print()

try:
    # Mantener la conexión y procesar mensajes
    cliente.loop_forever()

except KeyboardInterrupt:
    print("\nSubscriber terminado.")

finally:
    cliente.disconnect()
```

Ejecutar:

```bash
python subscriber.py
```

El programa quedará esperando:

```text
===================================
         MQTT SUBSCRIBER
===================================
Broker : localhost:1887
Topic  : iot/curso/datos

Esperando mensajes...
Presiona Ctrl+C para terminar.
```

---

# 13. Probar Publisher y Subscriber

Para realizar la prueba necesitamos **tres terminales**.

## Terminal 1 — Broker

Ejecutar Mosquitto:

```bash
mosquitto -p 1887
```

Dejar esta terminal ejecutándose.

---

## Terminal 2 — Subscriber

Activar el entorno virtual:

```bash
cd mqtt-python
source .venv/bin/activate
```

Ejecutar:

```bash
python subscriber.py
```

Debe quedar esperando mensajes.

---

## Terminal 3 — Publisher

Activar el entorno virtual:

```bash
cd mqtt-python
source .venv/bin/activate
```

Ejecutar:

```bash
python publisher.py
```

Escribir:

```text
Dato > Hola desde Python
```

El subscriber debe recibir:

```text
Mensaje recibido: Hola desde Python
Topic: iot/curso/datos
```

Otro ejemplo:

Publisher:

```text
Dato > temperatura=27
✓ Publicado: temperatura=27
```

Subscriber:

```text
Mensaje recibido: temperatura=27
Topic: iot/curso/datos
```

---

# 14. Probar con las herramientas de Mosquitto

También podemos comprobar MQTT sin Python.

En una terminal ejecutar:

```bash
mosquitto_sub -h localhost -p 1887 -t iot/curso/datos
```

Y desde otra:

```bash
mosquitto_pub -h localhost -p 1887 -t iot/curso/datos -m "Hola desde Mosquitto"
```

El subscriber debe mostrar:

```text
Hola desde Mosquitto
```

Esto permite comprobar que el problema, si aparece, puede estar en Python o en MQTT.

---

# 15. Flujo completo

La comunicación que estamos realizando es:

```text
                  PUBLICAR
              "temperatura=27"
                     │
                     ▼
             ┌───────────────┐
             │    MOSQUITTO  │
             │    BROKER     │
             │ localhost:1887│
             └───────┬───────┘
                     │
                     │ topic:
                     │ iot/curso/datos
                     ▼
              ┌──────────────┐
              │  SUBSCRIBER  │
              │ subscriber.py│
              └──────────────┘
```

El Publisher y el Subscriber **no se comunican directamente**.

Ambos se comunican con el Broker.

---

# 16. Detener los programas

Para terminar el Publisher:

```text
Dato > salir
```

Para terminar el Subscriber:

```text
Ctrl+C
```

Para detener Mosquitto, si está ejecutándose en primer plano:

```text
Ctrl+C
```

---

# 17. Desactivar el entorno virtual

Cuando terminemos la práctica:

```bash
deactivate
```

El indicador `(.venv)` desaparecerá del prompt.

Para volver a trabajar posteriormente:

```bash
cd mqtt-python
source .venv/bin/activate
```

---

# 18. `.gitignore`

Si utilizamos Git, no debemos guardar el entorno virtual en el repositorio.

Crear:

```bash
nano .gitignore
```

Contenido:

```text
.venv/
__pycache__/
*.pyc
```

---

# 19. Estructura final

El proyecto debe quedar así:

```text
mqtt-python/
├── .venv/
├── publisher.py
├── subscriber.py
├── requirements.txt
└── .gitignore
```

---

# 20. Actividad propuesta

Modificar `publisher.py` para enviar diferentes tipos de datos.

Por ejemplo:

```text
temperatura=28.5
humedad=70
luz=450
presion=1012
estado=ACTIVO
```

Después modificar el programa para que el usuario pueda seleccionar el topic:

```text
1. temperatura
2. humedad
3. luz
4. estado
5. salir
```

Por ejemplo:

```text
Seleccione una opción: 1

Temperatura > 28.5

Publicado:
Topic: iot/curso/temperatura
Dato: 28.5
```

Esto será el punto de partida para trabajar posteriormente con **sensores, ESP8266 y MicroPython**.
