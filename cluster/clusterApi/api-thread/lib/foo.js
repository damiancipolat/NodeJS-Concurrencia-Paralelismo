//Traigo un elemento al azar.
const random = (min,max)=>{
    return (Math.floor(Math.random() * (max - min) + min));
}

module.exports.random = random;