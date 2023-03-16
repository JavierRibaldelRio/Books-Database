// Función que recibe como input un color en hexadecimal y determina si el color a de ser blanco o negro 


function elegirColorLetra(hex) {

    hex = hex.slice(1);      //Elimina la almuadilla

    let arr = hex.match(/.{1,2}/g);

    const col = arr.map((c) => {
        c = parseInt(c, 16) / 255;
        if (c <= 0.03928) {
            return c / 12.92;
        }

        else {
            return Math.pow((c + 0.055) / 1.055, 2.4);
        }
    });

    //Calcula el brillo


    let L = (0.2126 * col[0]) + (0.7152 * col[1]) + (0.0722 * col[2]);


    return (L > 0.179) ? '#000000' : '#ffffff';
}


export default elegirColorLetra;