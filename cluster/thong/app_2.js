//Incluyo el manejador de proceso THRONG.
const throng   = require('throng');

//Defino la cantidad de procesos a ejecutar paralelamente.
const WORKERS  = process.env.WEB_CONCURRENCY || 5;

//Función que se ejecuta al incio, se ejecutara una sola vez.
const procMaster = ()=>{
  console.log('Started master');
}

//Función que se ejecutara en cada proceso.
const procMain = (workerId)=>{
  
  console.log(`Started worker ${workerId}`);

}

//Defino la config. de procesos.
throng({
  workers  : WORKERS,
  lifetime : Infinity,
  master   : procMaster,
  start    : procMain
});