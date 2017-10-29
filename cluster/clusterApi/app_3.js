//Incluyo modulos.
const throng   = require('throng');
const express  = require('express');

//Total de instancias a ejecutar paralelamente.
const WORKERS  = 3;

const ports = [8000,8001,8002,8003];

//Puerto por defecto.
const port  = 8000;
const ip    = '127.0.0.1';

//Función que se ejecuta al incio, se ejecutara una sola vez.
const procMaster = ()=>{

  //Logeo inicio.
  console.log('');  
  console.log('------------------------');
  console.log(' Iniciando server api');
  console.log('------------------------');
  console.log('');  
  console.log('> Total de hijos [',WORKERS,']');
  console.log('');
 
}

//Función que se ejecutara en cada proceso.
const procMain = (workerId)=>{

  //Inicio server con expressjs.
  const app  = express();
  const port = ports[workerId];
  const host  = 'http://127.0.0.1:'+port;

  app.listen(port,ip,(err)=>{

    //Si hay un error, muestro por la consola, sino msj de inicio.
    if (err)
      console.log('> ERROR: hubo un problema al inciar el server en worker',workerId);
    else{

      console.log('> Server listen on: '+host);
      console.log('- API children:',host+'/'+workerId+'/info/');
      console.log('');

    }

  });

  //Defino rutas.
  app.get('/info/',(req,res)=>{

    res.json({msj:'Api response from process '+workerId});

  });

 app.get('*',(req,res)=>{
    res.json({error:"Servicio inexistente."});
  });

}

//Defino la config. de procesos.
throng({
  workers  : WORKERS,
  lifetime : Infinity,
  master   : procMaster,
  start    : procMain
});