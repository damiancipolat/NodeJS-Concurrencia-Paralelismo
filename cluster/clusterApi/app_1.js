const cluster 	= require('cluster');
const http 		  = require('http');
const numCPUs  	= require('os').cpus().length;

//Proceso Master.
const createMaster = ()=>{

	//Muestro info.
	console.log('> Iniciando cluster!');
	console.log('> Workers a crear: '+numCPUs);
	console.log('');
	console.log(`> Master ${process.pid} is running.`);
	console.log('');

	//Creo los workers.
  for (let i = 0; i < numCPUs; i++)
    cluster.fork();

  //Cuando finalizo el proceso padre.
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died.`);
  });

}

//Proceso Child, en su creación cada uno hace un fork y duplica el contexto.
const createChild = ()=>{

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`> Worker ${process.pid} started.`);

}


//Inicio el server.
if (cluster.isMaster)
  createMaster();
else
	createChild();