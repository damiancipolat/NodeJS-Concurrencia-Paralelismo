const cluster     = require('cluster');
const express     = require('express');

class Server{

  constructor(configData){

    //Bindeo evento de listen.
    this.onListen = this.onListen.bind(this);

    //Guardo config.    
    this.config = configData;

    //Inicio expressjs.
    this.app    = express();    

    //Inicio modo escucha.
    this.app.listen(this.config.port,this.onListen);

  }

  //En modo esucha.
  onListen(err){

    if (err)
      console.log('> ERROR: No se pudo iniciar el proceso.');
    else{
      console.log('> Server listen on: '+this.config.port);
      console.log('');
    }

  }

}

module.exports = Server;