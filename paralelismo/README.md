# Paralelismo

Aqui hay varios ejemplos de como usar paralelismo con NODEJS usando el modulo CLUSTER.

- ### Ejemplo 1: "Sumatora de numeros en paralelo"
Es un escenario en el que armarmos un array y se reparte en bloques la tarea de realizar la suma, la operatoria esta abierta la misma 
cantidad de procesos que el número de cpus disponibles en el equipo donde se corra el script.

```sh
"Para ejecutar:"
$ node /sumatoria/app.js
```
