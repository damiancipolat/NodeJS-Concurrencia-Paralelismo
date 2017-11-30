# NodeJS-Concurrencia-Paralelismo

### Introducción:
- Dos o más procesos decimos que son **CONCURRENTES**, **PARALELOS**, o que se ejecutan concurrentemente, cuando son procesados almismo tiempo, es decir, que para ejecutar uno de ellos, no hace falta que se haya ejecutado otro.

- En sistemas multiprocesador, esta ejecución simultánea podría conseguirse completamente, puesto que podremos asignarle, porejemplo, un proceso A al procesador A y un proceso B al procesador B y cada procesador realizaran la ejecución de su proceso.
Cuando tenemos un solo procesador se producirá un intercalado delas instrucciones de ambos procesos, de tal forma que tendremos la sensación de que hay un paralelismo en el sistema (concurrencia, ejecución simultánea de más de un proceso).

Una buena fuente para estudiar este tema:

https://speakerdeck.com/orlando/concurrencia-paralelismo-y-el-event-loop
https://www.oscarblancarteblog.com/2017/03/29/concurrencia-vs-paralelismo/

### CONCURRENCIA:
La concurrencia es la capacidad del CPU para **ejecutar más de un proceso al mismo tiempo**.

![N|solid](https://www.oscarblancarteblog.com/wp-content/uploads/2017/03/1-1.png)

### PARALELISMO:
El paralelismo sigue la filosofía de “divide y vencerás”, ya que consiste en tomar un único problema, y mediante concurrencia llegar a una solución más rápido. **El paralelismo lo que hace es tomar el problema inicial, dividir el problema en fracciones más pequeñas, y luego cada fracción es procesada de forma concurrente**, aprovechando al máximo la capacidad del procesador para resolver el problema.

![N|solid](https://www.oscarblancarteblog.com/wp-content/uploads/2017/03/2.png)


Para ver como aplicar estos conceptos con NODEJS tenemos que aprender sobre el termino **[CLUSTER]**:

[CLUSTER]:https://github.com/damiancipolat/NodeJS-Concurrencia-Paralelismo/tree/master/cluster

## Ejemplos / Concurrencia:
En el directorio [concurrencia] hay algunos ejemplos y escenarios de como implementar esto en nodejs.

[concurrencia]:https://github.com/damiancipolat/NodeJS-Concurrencia-Paralelismo/tree/master/concurrencia

## Ejemplos / Paralelismo:
En el directorio [paralelismo] hay algunos ejemplos y escenarios de como implementar esto en nodejs.

[paralelismo]:https://github.com/damiancipolat/NodeJS-Concurrencia-Paralelismo/tree/master/paralelismo

## Resumiendo:
Fuente: https://platzi.com/blog/concurrencia-paralelismo-go-sengrid/

Cuando tienes varias tareas que ejecutar y las haces al mismo tiempo necesitas una concurrencia.

**Ejemplo**
Imagina que tienes dos tareas en el día: llegar de la casa al trabajo (Tarea 1) y hacer una presentación (Tarea 2).

Para llegar del trabajo a la casa tienes que tomar tres trenes: A B y C y esto toma 2 horas.
Para hacer la presentación toma de tu tiempo 4 horas.
Puedes ejecutar las tareas de tres maneras:

Ejecución secuencial: Puedes ir al trabajo y a la llegada empezar a hacer la presentación. Así entonces, el total de tiempo para ejecutar las dos tareas en este caso, sería de 6 horas.

Ejecución concurrente: te das cuenta que puedes emplear el tiempo en el que permaneces sentado en el tren para sacar tu laptop y adelantar la presentación, mientras llegas el trabajo. Los procesos son interrumpidos, pues no puedes trabajar en tu presentación mientras haces la fila para cada tren y es importante notar, que ambas tareas son ejecutadas por una misma persona.

Ejecución paralela: En este caso, tienes un compañero de equipo al cual le pides que trabaje contigo en la presentación. Al final llegas al trabajo y tienes la presentación lista. En este caso, nota que el trabajo de presentación fue ejecutado por dos personas

Para resumir:

En concurrencia trabajas en tareas que son ejecutadas al mismo tiempo y de forma independiente.
En paralelismo, divides el trabajo en sub-tareas para que pueda ser finalizado por más ejecutores.
