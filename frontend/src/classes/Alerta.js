// Clase alerta que almacena la inforomación necesaria para generaruna alerta cerrable 

class Alerta {

    constructor(mostrar = false, texto = '', tipo = "primary") {

        this.mostrar = mostrar;
        this.texto = texto;
        this.tipo = tipo;
    }
}

export default Alerta;