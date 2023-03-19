import React from 'react';

import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function BotonesColeccion(props) {

    const id = props.id

    return <div className='botones-coleccion' key={"BotonesColeccion" + id}>

        <span className='elipse'>{props.nombre}</span>
        <a role={"button"} className='btn btn-primary boton-coleccion'>Ver &nbsp;<FontAwesomeIcon icon={faEye} /></a>

        <a role={"button"} href="google.com" className='btn btn-warning boton-coleccion'>Editar &nbsp;<FontAwesomeIcon icon={faPenToSquare} /></a>

        <a role={"button"} className='btn btn-danger boton-coleccion'>Eliminar &nbsp;<FontAwesomeIcon icon={faTrash} /></a>
    </div>
}

export default BotonesColeccion;