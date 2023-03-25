// Genera un color random
function randomHex() {

    //Dodos los posibles valorea que puede tener el color
    const ch = "0123456789ABCDEF";

    let col = "#"       //Caracter inicial del color

    // Genera el nuevo color
    for (var i = 0; i < 6; i++) {
        //Nuevo valor del color
        col += ch[Math.floor(Math.random() * 16)]
    }

    return col;
}

export default randomHex;
