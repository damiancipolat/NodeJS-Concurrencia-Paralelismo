//Incluyo modulos.
const cluster = require('cluster');
const http    = require('http');
const express = require('express');

//Incluyo modulos de procesos.
const Master  = require('./lib/master.js');
const Worker  = require('./lib/worker.js');

//Switch por proeso.
if (cluster.isMaster)
  new Master();
else
  new Worker();




//const db      = require('./lib/dbWrapper.js');

//console.log(db.saveProcess());

/*
const tmp = ['aaa','bbb','ccc','ddd'];

let objRandom = new Random(tmp);

console.log(objRandom.planificate());
*/
