//Instancia a Lokijs DB.
const loki = require('lokijs');

//Creo la BD.
const db   = new loki('loki.json');

//Cargo la colección de procesos.
const processCol = db.addCollection('process');

//Guardo el nuevo proceso.
const saveProcess = (workerId)=>{

  //Guardo el proceso.
  return processCol.insert({gId :workerId});

}

module.exports.saveProcess = saveProcess;

/*
const test = ()=>{

  processCol.insert({id:1,name:'Sleipnir', legs: 8});
  processCol.insert({id:2,name:'Jormungandr', legs: 0});
  processCol.insert({id:3,name:'Hel', legs: 2});

  return processCol.get(1);

}

module.exports.test = test;*/