const cluster     = require('cluster');
const db          = require('./dbWrapper.js');
const config      = require('./config.js');
const Randomizer  = require('./randomizer.js');
const Server      = require('./server.js');
const express     = require('express');


//Proceso principal.
class Master{

  constructor(){

    if (config.planif=='random')
      this.planificator = new Randomizer();

    //Creo los workers.
    this.createWorkers();

    //Creo el server.
    this.server = new Server(config);

  }


  //Cuando recibo el msj. de un children.
  onChildMsg(msg){
  
    console.log('> Vino de un children:',msg);

  }

  //Armo el workerId.
  getWorkerId(pId,workerId){

    return 'worker-'+pId+'-'+workerId;

  }

  //Cargo los procesos childrens.
  createWorkers(){

    //Guardo la estructura de procesos en una matriz [workerId][gidRequest].
    for (let i = 0; i <= config.workers-1; i++)
      cluster.fork();
    
    for (const id in cluster.workers){

      //Agrego handler.
      cluster.workers[id].on('message',this.onChildMsg);
     
      //Armo el id del proceso.
      const workerId = this.getWorkerId(id,cluster.workers[id].process.pid);

      //Guardo el worker.
      db.saveProcess(workerId);
      
      //Agrego property.
      cluster.workers[id].idWorker = workerId;

    }

  }

}

module.exports = Master;

  /*

  //Creo el mensaje.
  makeMsgChild(workId,reqId,req,res){

    return { cmd    :'api-request',
            reqId   : reqId,
            workId  : workId,
            request : {url    :req.url,
                       headers:req.headers,
                       body   :req.body}};
  }

  //Envio el request a un worker.
  sendRequestWorker(req,res){

    //Le pido al planificador un worker.
    let worker   = this.planificator.planificate(this.bd.getWorkers());

    //Agrego el request y obtengo la coordenada del nuevo request.
    let reqCoord = this.bd.addRequest(worker,req);
    
    //De la lista de workers traigo el que tiene ese id y le envio el mensaje.
    for (const id in cluster.workers){

      //Si encuentro el worker, el envio el mensaje.
      if (cluster.workers[id].idWorker==reqCoord[0]){

        console.log('> send to worker',cluster.workers[id].idWorker);
        cluster.workers[id].send(this.makeMsgChild(cluster.workers[id].idWorker,reqCoord[1],req,res));

      }

    }    

  }

  //Creo el server.
  createServer(){

    //Seteo el server.
    this.app  = express();
  
    //Manejo de rutas.
    this.app.get('/info/',(req,res)=>{

      this.sendRequestWorker(req,res);

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
  */


