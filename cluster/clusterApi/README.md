# CLUSTER API

### Repositorio:
https://nodejs.org/api/cluster.html

La forma de trabajo de throng es hacer forks de nuestros proceso, es decir realiza copias del mismo y los ejecuta paralelo al nuestro, no se debe confundir con un esquema de hilos. 

En los ejemplos la cantidad de WORKERS que definamos se generan esa misma cantidad de procesos hijos, se puede observar esto en el administrador de procesos del sistema operativo, veremos que nuestro proceso aparece con la misma cantidad +1 que es el proceso padre.

Si WORKERS= 5 veremos 6 (5 proceso hijos y 1 proceso padre).

- Lista de ejemplos:

```sh

EJEMPLO 1: "Ejemplo basico de como iniciar 5 procesos y asociar una función a cada uno."
$ node app_1.js

EJEMPLO 2: "Muestra como iniciar 5 proceso y agregar un proceso padre al inicio."
$ node app_1.js

EJEMPLO 3: "Iniciar un server que inicia 3 procesos como hijos conteniendo en cada uno un servidor de api rest."
$ node app_3.js

```

En escenarios más complejos se debe ver como plantear la comunicación entre procesos, estos diseños podrian usarse para simular un balancedor de carga y tener varias instancias de nuestros proceso ejecutando, encontrando una forma de poder solucionar el problema que plantea NODEJS que funciona en un unico hilo.
