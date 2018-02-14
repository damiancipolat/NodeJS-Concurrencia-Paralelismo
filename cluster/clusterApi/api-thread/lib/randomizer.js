const foo = require('./foo.js');

//Random planificator.
class Randomizer{

  constructor(data){

    if (data!=null)
      this.list = data;
    else
      this.list = [];
  }

  //Cargo la lista de datos.
  fillList(listData){
    this.list = listData;
  }

  //Traigo un proceso al azar.
  getProcess(proc){
    return proc[foo.random(1,proc.length)];
  }

  //Recibo la lista de procesos y elijo donde agregarlo.
  planificate(){
    return this.getProcess(this.list);
  }

}

module.exports = Randomizer;