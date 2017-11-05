//Incluyo modulos.
const cluster = require('cluster');
const http    = require('http');

//Defino puerto.
const port    = 8000;

//Cantidad de cpus del equipo donde se ejecuta este script.
const numCPUs = require('os').cpus().length;

//Lista de flags.
const resuFlags = [];
let total     = 0;

//Genero un lote de numeros para repartir entre los procesos children.
const seqNums = ()=>{

  let nums = [];
  for (let i=0;i<=1000000;i++)
    nums.push(i);

  return nums;
}

//Separo un array en partes iguales, en caso que no sea exacto fuera al a
const chunkify = (arr, size)=>{
    
    let i,j   = arr.length,

    tempArray = [];
    
    for (i=0; i<j; i+=size)
        tempArray.push(arr.slice(i,i+size));   

    //Si el reparto no fue en cantidades iguales.
    if (tempArray.length>size)
      tempArray[tempArray.length-2]=[...tempArray[tempArray.length-2],...tempArray[tempArray.length-1]];    

    return tempArray

}

//Si cumplio con el calculo.
const okCalc = ()=>{

  let cont = 0;

  for (let obj in resuFlags){

    if (resuFlags[obj].flag==true)
      cont ++;

  }

  return (cont==numCPUs);
}

//Cuando recibo un msg. desde un children.
const onChildMsg = (msg)=>{

  console.log('> Vino del children:',msg);
  
  if (msg.cmd=='calcRequestResponse'){
    resuFlags[msg.idProc] = {flag:true,total:msg.valor};
    total = total+parseInt(msg.valor);
  }

  if (okCalc){
    console.log('');
    console.log('PROCESO FINAL, TOTAL:',total,'calculado por', numCPUs,'procesos');
    console.log('');
  }

}

//MASTER:
const procMaster = ()=>{

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

}

//Cuando recibo un msg del proc. master.
const onMasterMsg = (msg)=>{

  if (msg!=null){

    //Cuando recibo una solicitud de calculo.
    if (msg.cmd=='calcRequest'){

      if (msg.data!=null){

        console.log('> Received msj from master:',msg.cmd);

        //Traigo el resultado de la suma.
        let calcRESU = msg.data.reduce((a,b)=> a + b , 0);

        
        //Envio la respuesta al proceso master, con el resulado del calculo.
        process.send({cmd:'calcRequestResponse',valor:calcRESU,idProc:msg.idProc});


      }

    }

  }
  


}

//CHILDREN:
const procChild = ()=>{

  //Agrego un handler para cuando recibo del master un mensaje.
  process.on('message', onMasterMsg);

}



//Inicio de la aplicación, bifurco para el master y children.
if (cluster.isMaster)
  procMaster();
else
  procChild();