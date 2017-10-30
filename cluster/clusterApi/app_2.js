//Incluyo modulos.
const cluster = require('cluster');
const http 	  = require('http');

//Defino puerto.
const port 		= 8000;

//Proceso master.
const procMaster = ()=>{

  //Contador de requests.
  let numReqs = 0;

  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  //Count requests
  const messageHandler = (msg)=>{

		console.log('> msg',msg);

    if (msg.cmd && msg.cmd === 'notifyRequest')
      numReqs += 1;

  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;

  console.log('workers N°:',numCPUs);

  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  for (const id in cluster.workers)
    cluster.workers[id].on('message', messageHandler);

}

//Proceso children.
const procChild = ()=>{

  //Inicio http server.
  http.Server((req, res) => {

    res.writeHead(200);
    res.end('hello world\n');

    //Envio un msj al proceso padre.
    process.send({ cmd: 'notifyRequest' });

  }).listen(port);

}


//Inicio los procesos.
if (cluster.isMaster)
	procMaster();
else
	procChild();