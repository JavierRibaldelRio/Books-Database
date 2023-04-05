// Función que devuelve las 3 primeras letras de un string

function recortar3Letras(string) {

    console.log('typeof string :>> ', typeof string);

    if (!/^[0-9]*$/.test(string)) {
        return string.substring(0, 3);
    }
    else {

        return string;
    }
}

export default recortar3Letras;