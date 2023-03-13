//Se ocupa de pasar a mayúsculas la primer letra de una palabra

var pasarAMayusPalabra = (str) => (str[0] !== undefined) ? str[0].toUpperCase() + str.substring(1) : undefined;

//Pasa una frase con cada letra de una palabra a mayúsculas
var pasarAMayusFrase = (str) => (str[0] !== undefined) ? str.trim().split(' ').map(pasarAMayusPalabra).join(' ') : undefined;


export default pasarAMayusPalabra;

export { pasarAMayusFrase }