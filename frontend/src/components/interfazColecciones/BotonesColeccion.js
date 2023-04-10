import React from 'react';

// Font awosome
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate } from 'react-router-dom';


function BotonesColeccion(props) {

    const { coleccion_id, nombre } = props.coleccion     //Obtine la id y el nombre

    const navigate = useNavigate();



    // Elimina la colección
    function eliminarColeccion() {

        // Pregunta si deseas eliminar la colección
        if (window.confirm("¿Seguro qué desea eliminar esta colección? (los libros que contine NO se eliminaran)")) {
            // Elimna la coleccón
            fetch('/api/collection/remove-collection/' + coleccion_id, { method: 'DELETE' }).then((res) => {
                if (res.status === 204) {

                    // Alerta al usuario de que la colección ha sido eliminada correctamente
                    props.alertar({ texto: nombre + " se a elimindado  correctamente.", tipo: "success" })
                } else {

                    // Alerta en caso de que se haya producido un error
                    props.alertar({ texto: 'Se ha producido un error, no se ha podido eliminar la colección', tipo: "danger" })

                }
            }).catch(e => console.error(`Se ha producido un error: "`));

        }
    }

    return <div className='botones-coleccion' key={"BotonesColeccion" + coleccion_id}>

        {/* Nombre de la colección */}
        <span className='elipse'>{pasarAMayusFrase(nombre)}</span>

        {/* Botones de control de la colección */}
        <a role={"button"} href={'/colecciones/' + coleccion_id} className='btn btn-primary boton-coleccion'>Ver &nbsp;
            <FontAwesomeIcon icon={faEye} />
        </a>

        <button className='btn btn-warning boton-coleccion' onClick={() => navigate('/colecciones/editar', { state: { data: props.coleccion } })}>
            Editar &nbsp;<FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button className='btn btn-danger boton-coleccion' onClick={eliminarColeccion}>
            Eliminar &nbsp;<FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}

export default BotonesColeccion;