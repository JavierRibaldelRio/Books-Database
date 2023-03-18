import React, { Component } from 'react';

import EstiloColeccion from '../../classes/EstiloEtiquetaColeccion'

import { pasarAMayusFrase } from '../../scripts/pasarAMayus'
import BotonesColeccion from './BotonesColeccion';

class Coleccion extends Component {
    constructor(props) {
        super(props)

        let nombreTemp = pasarAMayusFrase(this.props.coleccion.nombre);

        this.state = { nombre: nombreTemp, contenido: nombreTemp }

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

    }

    onMouseOver() {


        this.setState({ contenido: <BotonesColeccion id={this.props.coleccion.coleccion_id} nombre={this.state.nombre} /> })
    }

    onMouseOut() {

        this.setState({ contenido: <div className='titulo-coleccion'>{this.state.nombre}</div> })
    }
    render() {
        const { nombre, color } = this.props.coleccion;

        const id = this.props.coleccion.coleccion_id;



        return <div key={id} className="carpeta-coleccion  contenedor-fondo-blaqueado" style={new EstiloColeccion(color)} onMouseEnter={this.onMouseOver} onMouseLeave={this.onMouseOut}>
            <span className='nombre-coleccion blanquear-fondo'>
                {this.state.contenido}
            </span>
        </div>
    }
}
export default Coleccion