import React, { Component } from 'react';

import EstiloColeccion from '../../classes/EstiloEtiquetaColeccion'

import { pasarAMayusFrase } from '../../scripts/pasarAMayus'

function Coleccion(props) {


    const { nombre, color } = props.coleccion;

    const id = props.coleccion.coleccion_id;

    return <a key={id} href={'/colecciones/' + id} className="contenedor-fondo-blaqueado" style={new EstiloColeccion(color)}><span className='blanquear-fondo'>{pasarAMayusFrase(nombre)}</span></a>
}

export default Coleccion