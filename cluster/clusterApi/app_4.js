//Incluyo modulos.
const cluster = require('cluster');
const http    = require('http');
const express = require('express');

//Configuración del server.
const config  = {
  workers : 3,
  port    : 8000,
  ip      : '127.0.0.1',
  planif  : 'random'
}

//Lista de procesos.
const processList = {
  list    : [],
  counter : 0
};


//Random planificator.
class Randomizer{

  constructor(){

  }

  //Traigo un elemento al azar.
  random(min,max){

    return (Math.floor(Math.random() * (max - min) + min));

  }

  //Traigo un proceso al azar.
  getProcess(proc){

    return proc[this.random(1,config.workers)];

  }

  //Recibo la lista de procesos y elijo donde agregarlo.
  planificate(procList){

    return this.getProcess(procList);

  }

}

//Registro de processos y requests.
class ProcessBd{

  constructor(){

    this.buffer    = [];
    this.counterId = 0;

  }

  //Agrego el request al buffer de procesos.
  addRequest(workerId,val){

    let gId = 'req_'+this.counterId;

    //Incremento el contador.
    this.counterId++;

    //Guardo el proceso.
    this.buffer[workerId].push({active:true,response:null});

    return [workerId,gId];

  }

  //Agrego un worker.
  addWorker(workerId){

    if (this.buffer[workerId]!=null)
      return false;
    else{

      this.buffer[workerId] = [];
      return true;

    }

  }

  //Traigo la lista de codigo de procesos.
  getWorkers(){

    let list = [];

    for (let tmp in this.buffer)
      list.push(tmp);

    return list;

  }

  //Traigo el lote de datos.
  getBd(){

    return this.buffer;

  }

}

//Proceso principal.
class Master{

  constructor(){

    //Creo el almacenador de procesos.
    this.bd = new ProcessBd();

    if (config.planif=='random')
      this.planificator = new Randomizer();

    //Creo los workers.
    this.createWorkers();

    //Creo el server.
    this.createServer();

  }

  //Cuando recibo el msj. de un children.
  onChildMsg(msg){
  
    console.log('> Vino del children:',msg);

  }

  //Cargo los procesos childrens.
  createWorkers(){

    //Guardo la estructura de procesos en una matriz [workerId][gidRequest].
    for (let i = 0; i <= config.workers-1; i++){

      //Agrego un nuevo proceso.
      this.bd.addWorker('worker-'+i);

      cluster.fork();

    }

    //Agrego a los workers el handler cdo. obtengo una respuesta de el.
    for (const id in cluster.workers){

      cluster.workers[id].on('message',this.onChildMsg);
      cluster.workers[id].send({cmd:'api-request',workerId:1111});

    }

  }

  //Creo el server.
  createServer(){

    //Seteo el server.
    this.app  = express();
  
  /*  
    console.log('>>',this.bd.getWorkers());
    console.log(config.planif);
    console.log('/',this.planificator.planificate(this.bd.getWorkers()));
    console.log('/',this.planificator.planificate(this.bd.getWorkers()));
    console.log('/',this.planificator.planificate(this.bd.getWorkers()));
*/
    //Manejo de rutas.
    this.app.get('/info/',(req,res)=>{

      res.json({msj:'Api response from worker'});

      //Traigo el worker.    
      let worker = this.planificator.planificate(this.bd.getWorkers());

      //Agrego el request y obtengo la coordenada del nuevo request.
      let reqCoord = this.bd.addRequest(worker,111);
      console.log('--->',reqCoord);



    });

    this.app.get('*',(req,res)=>{
      res.json({error:"Servicio inexistente."});
    });

    //Inicio modo escucha.
    this.app.listen(config.port,config.ip,(err)=>{

      if (err)
        console.log('> ERROR: No se pudo iniciar el proceso.');
      else{

        console.log('> Server listen on: '+config.port);
        console.log('');

      }

    });

  }

}

//Proceso hijo.
class Worker{
  
  constructor(){
  
    process.on('message', this.onMasterMsg);

  }

  //Cuando llega del master.
  onMasterMsg(msg){

    console.log('> llega del master',msg);

  }

}


//Switch por proeso.
if (cluster.isMaster)
  new Master();
else
  new Worker();



/*


//Cuando recibo un msg. desde un children.
const onChildMsg = (msg)=>{

  console.log('> Vino del children:',msg);
  
}

//On master msg.
const onMasterMsg = (msg)=>{

  console.log('> llega del master',msg);

  /*if (msg.cmd!=null){

    if (msg.cmd=='api-request'){

        msg.resObj.json({msj:'Api response from worker'});
        
      let appObj = msg.expressApp;

      //Defino rutas.
      appObj.get('/info/',(req,res)=>{

        res.json({msj:'Api response from worker'});

      });

      appObj.get('*',(req,res)=>{
        res.json({error:"Servicio inexistente."});
      });

    }

  }

}

//Proceso children.
const procChildren = ()=>{

  console.log('proc children');

  //Agrego un handler para cuando recibo del master un mensaje.
  process.on('message', onMasterMsg);
  
}

//Reparto las conexiones en base a los childrens al azar.
const randomDispatch = (res)=>{

  //Traigo el worker a donde agregare el proceso.
  let workIx = random(1,processList.list.length);
  
  console.log('->',res);

  //Creo un nuevo process.
  processList.counter++;

  //Lo agrego al proceso.
  processList.list[workIx].process.push({gid : 'pid-'+processList.counter});  

  //Envio mensaje.
  cluster.workers[workIx].send({cmd:'api-request',workerId:workIx,resObj:res});

}








  //Cargo la estructura en los workers.
  for (let i = 0; i <= config.workers-1; i++){
    
    processList.list.push({process : [], workerId : 'worker-'+i});
    cluster.fork();

  }

  //A cada worker le agrego event handler para cuando recibo desde el master msgs. de ellos.
  for (const id in cluster.workers){

    //Seteo handler.
    cluster.workers[id].on('message',onChildMsg);

    //Envio mensaje.
    cluster.workers[id].send({cmd:'calcRequest'});

  }  

  //Cuando entro al path /api/
  app.use('/api/',(req,res)=>{

    //Reparto el request a un worker.
    //randomDispatch(app);    

  });

  //Inicio el server.  
  app.listen(config.port,config.ip,(err)=>{

    if (err)
      console.log('> ERROR: No se pudo iniciar el proceso.');
    else{

      console.log('> Server listen on: '+config.port);
      console.log('');

    }

  });
*/