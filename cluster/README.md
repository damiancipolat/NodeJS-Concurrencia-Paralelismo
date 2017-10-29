# CLUSTERING

### FUENTE
https://devcenter.heroku.com/articles/node-concurrency

NODEJS tiene una capacidad limitada para escalar a diferentes tamaños de contenedor. Es de un solo subproceso, por lo que no puede aprovechar automáticamente los núcleos de CPU adicionales. Promover,
está basado en V8, que tiene un límite de memoria dura de alrededor de 1,5 GB, por lo que tampoco puede aprovechar automáticamente la memoria adicional.

En cambio, las aplicaciones de Node.js deben dividir varios procesos para maximizar sus recursos disponibles. Esto se denomina "clustering" y es compatible con Node.js
Cluster API. Puede invocar la API de clúster directamente en su aplicación, o puede usar una de muchas abstracciones sobre la API. Aquí, usaremos throng.
