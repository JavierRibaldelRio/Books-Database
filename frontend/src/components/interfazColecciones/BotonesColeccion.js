import React from 'react';

// Font awosome
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function BotonesColeccion(props) {

    const id = props.id     //Obtine la id

    return <div className='botones-coleccion' key={"BotonesColeccion" + id}>

        {/* Nombre de la colección */}
        <span className='elipse'>{props.nombre}</span>

        {/* Botones de control de la colección */}
        <a role={"button"} className='btn btn-primary boton-coleccion'>Ver &nbsp;
            <FontAwesomeIcon icon={faEye} />
        </a>

        <a role={"button"} className='btn btn-warning boton-coleccion'>
            Editar &nbsp;<FontAwesomeIcon icon={faPenToSquare} />
        </a>

        <a role={"button"} className='btn btn-danger boton-coleccion'>
            Eliminar &nbsp;<FontAwesomeIcon icon={faTrash} />
        </a>
    </div>
}

export default BotonesColeccion;