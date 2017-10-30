# CLUSTER API

### Documentación oficial:
https://nodejs.org/api/cluster.html

Una instancia única de Node.js se ejecuta en un único hilo. Para aprovechar los sistemas multi-core, el usuario a veces querrá lanzar un clúster de procesos Node.js para manejar la carga.

El módulo de clúster permite la creación sencilla de procesos secundarios que comparten todos los puertos del servidor.

- Lista de ejemplos:

```sh

EJEMPLO 1: "Ejemplo basico de como hacer forks con nodejs, definir proceso master y childrens."
$ node app_1.js

```
Usar el modulo CLUSTER de nodejs nos permite hacer aplicaciones mucho más complejas, en vez de usar el wrapper THRONG, tiene un mayor nivel de dificultad pero superada esa etapa abre puerta a poder usar muchas funcionalidades de este modulo, que sirven para poder crear aplicaciones que se ejecuten concurrentemente.
