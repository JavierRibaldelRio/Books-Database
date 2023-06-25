import React, { Component } from 'react';

import EstiloColeccion from '../../classes/EstiloEtiquetaColeccion'

import { pasarAMayusFrase } from '../../scripts/pasarAMayus'
import BotonesColeccion from './BotonesColeccion';


// Muestra cada una de las colecciones
class Coleccion extends Component {
    constructor(props) {
        super(props)

        // Obtiene el nombrre de la colecciñon y lo pasa a mayúsculas
        let nombreTemp = pasarAMayusFrase(this.props.coleccion.nombre);

        this.state = { nombre: nombreTemp, contenido: nombreTemp }

        // Funciones
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

        this.mostrarTitulo = this.mostrarTitulo.bind(this);

        // Obtine la función alertar del padre
        this.alertar = this.props.alertar.bind(this);


    }

    // Al tener el raton encima renderiza los botones de la colección
    onMouseOver() {


        this.setState({ contenido: <BotonesColeccion coleccion={this.props.coleccion} alertar={this.alertar} mostrarTitulo={this.mostrarTitulo} /> })
    }

    // Al tener el ratón fuera del contenido muesta el nombre normal de la coleccion
    onMouseOut() {

        this.mostrarTitulo();

    }

    // Muestra el nombre de la colección
    mostrarTitulo() {

        this.setState({ contenido: <div className='titulo-coleccion'>{this.state.nombre}</div> })

    }




    render() {

        // Obtiene el color y la id de la colección
        const color = this.props.coleccion.color;
        const id = this.props.coleccion.coleccion_id;

        // Crea el estilo de la carpeta
        const estilo = new EstiloColeccion(color);

        return <div key={id} className="  contenedor-fondo-blaqueado" style={estilo} onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver} >
            <span className='contenido-carpeta-coleccion blanquear-fondo center'>
                {this.state.contenido}
            </span>
        </div>
    }
}
export default Coleccion