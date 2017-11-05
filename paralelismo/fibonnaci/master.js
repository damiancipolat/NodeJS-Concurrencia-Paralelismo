const cluster = require('cluster');
const lib     = require('./lib.js');

//Array con el resultado de cada proceso.
let childList = [];

//Cuando recibo un mensaje de un children.
const onChildMsg = (msg)=>{

  //Si obtengo el resultado.
  if (msg.cmd == 'calc-response'){
  
    //Grabo el resultados.
    childList[msg.idProc] = {completed:true, value:msg.value};

    //Reviso si se completo el lote de calculos.
    

  }

}

//Creo la cantidad de procesos pasados por parametro.
const createChilds = (nprocs, seq)=>{

  //Fragmento por bloques los datos un indice para cada fork.
  let bloqs  = lib.chunkify(seq, seq.length/nprocs);

  //Creo los workers en base a la cantidad de cpus del equipo.
  for (let i = 0; i <= nprocs; i++)
    cluster.fork();

  //A cada worker le agrego event handler, para cuando recibo un msj.
  for (const id in cluster.workers){

    //Seteo handler, para cuando se recibe un msj desde un childen.
    cluster.workers[id].on('message', onChildMsg);

    //Envio a cada children el lote de calculos a procesar.
    cluster.workers[id].send({cmd:'calc-request', data:bloqs[id-1], idProc:id});

    //Cargo en el array de procesos los resultados.
    childList[id] = {completed:false, value:null};

  }

  console.log('> Procesos hijos creados',nprocs);
  console.log('');

}

//Función principal del proceso.
module.exports.start = (nProcs, seq)=>{

  console.log('> Creando procesos.');

  //Creo los procesos hijos.
  createChilds(nProcs, seq);

}


/*
    //Envio mensaje.
    cluster.workers[id].send({cmd:'calcRequest',data:bloqs[id-1],idProc:id});

    //Seteo inicio.
    resuFlags[id] = {flag:false,total:0};

  //Armo un lote grande de numeros.
  const loteNums = seqNums();

  //Fragmento por bloques los datos un indice para cada fork.
  let bloqs      = chunkify(loteNums,loteNums.length/numCPUs);

  //Reparto bloques de numeros entre cada proceso hijo.
  console.log('Bloque a repartir:',loteNums.length,' entre ',numCPUs,' procesos',numCPUs);
  
  //Creo los workes en base a la cantidad de cpus del equipo.
  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  //A cada worker le agrego event handle para cuando recibo desde el master msgs. de ellos.
  for (const id in cluster.workers){

    //Seteo handler.
    cluster.workers[id].on('message',onChildMsg);

    //Envio mensaje.
    cluster.workers[id].send({cmd:'calcRequest',data:bloqs[id-1],idProc:id});

    //Seteo inicio.
    resuFlags[id] = {flag:false,total:0};

  }
*/


