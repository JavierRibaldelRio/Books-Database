
// Crea un objeto que contiene las propiedades de estilo de la étiqueta dela coleccion

import elegirColorLetra from "../scripts/elegirColorLetra";

class EstiloColeccion {


    constructor(c) {

        this.setColor(c)

        this.backgroundColor = c;

        this.borderColor = c

        // El color de la Check Box al ser marcada          
        this.accentColor = c;
    }

    // Decide si el color de fondo a de ser blanco o negro
    setColor(c) {

        this.color = elegirColorLetra(c)
    }
}

export default EstiloColeccion;