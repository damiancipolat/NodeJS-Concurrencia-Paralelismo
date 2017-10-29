//Incluyo modulos.
const throng   = require('throng');
const express  = require('express');

//Total de instancias a ejecutar paralelamente.
const WORKERS  = 3;
let   childs   = [];

//Puerto por defecto.
const port  = 8000;
const ip    = '127.0.0.1';

//ServerApi
const serverApi = (proc,workerId)=>{

  const app  = express();

  app.listen(proc.port,(err)=>{

    //Si hay un error, muestro por la consola, sino msj de inicio.
    if (err)
      console.log('> ERROR: hubo un problema al inciar el server en worker',workerId);
    else{

      console.log('> Server listen on: '+proc.port);
      console.log('');

    }

  });  

}

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

//Ejecuto este proceso como un FORK como clon del proceso padre.
const procMain = (workerId)=>{

  //Traigo la info. del proceso.
  let proc = childs.find((proc) => proc.pId===workerId);

  //Inicio server con expressjs.
  /*const app  = express();
  const port = ports[workerId];
  const host  = 'http://127.0.0.1:'+port;
  */
console.log(workerId,proc);
  /*app.listen(port,ip,(err)=>{

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
  });*/

}

//Cargo estructuras que van a usar todos los procesos cuando se inicien.
const procStructs = ()=>{

  let tmp =[];

  for (let i=1;i<=WORKERS;i++)
    tmp.push({pId:i,port:port+i});  

  return tmp;

}

//Cargo la estructura para los procesos hijos.
childs = procStructs();

//El proceso se debe iniciar asi ya que se hara un fork de cada proceso hijo.
throng({
  workers  : WORKERS,
  lifetime : Infinity,
  master   : procMaster,
  start    : procMain
});