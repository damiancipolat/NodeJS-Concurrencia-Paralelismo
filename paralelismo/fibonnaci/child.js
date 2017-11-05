const lib  = require('./lib.js');

//Solicitud de calculo.
const calcRequest = (nums)=>{ 

  //Calculo los n° fibonacci.
  return nums.map((num) => lib.fibonacci(num));

}

//Cuando recibo un msg del proc. master.
const onMasterMsg = (msg)=>{

  if (msg!=null){

    //Cuando recibo una solicitud de calculo.
    if (msg.cmd=='calc-request'){

      if (msg.data!=null){

        //Traigo el lote de resultados.
        let result = calcRequest(msg.data);     

        console.log('> Children - fibonacci',msg.data,'Result',result);

        //Envio el resultado del calculo al proceso master.
        process.send({cmd:'calc-response', data:result , idProc: msg.idProc});
        
      }

    }

  }

}

//La función que procesa el children.
module.exports.start = ()=>{

  //Agrego un handler para cuando recibo un msg. del master.
  process.on('message', onMasterMsg);

}