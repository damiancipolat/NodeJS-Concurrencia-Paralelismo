//Calcula la serie de fibonnacci.
module.exports.fibonacci = (num)=>{

  let a = 1, b = 0, temp;

  while (num >= 0){

    temp = a;
    a    = a + b;
    b    = temp;

    num--;

  }

  return b;

}

//Separo un array en partes iguales, en caso que no sea exacto fuera al a
module.exports.chunkify = (arr, size)=>{
    
  let i,j   = arr.length,

  tempArray = [];
  
  for (i=0; i<j; i+=size)
      tempArray.push(arr.slice(i,i+size));   

  //Si el reparto no fue en cantidades iguales.
  if (tempArray.length>size)
    tempArray[tempArray.length-2] = [...tempArray[tempArray.length-2], ...tempArray[tempArray.length-1]];

  return tempArray;

}
