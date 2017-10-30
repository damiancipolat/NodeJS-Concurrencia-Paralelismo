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

[paralelismo]:https://github.com/damiancipolat/NodeJS-Concurrencia-Paralelismo/tree/master/concurrencia
