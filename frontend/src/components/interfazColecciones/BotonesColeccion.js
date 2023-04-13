import React from 'react';

// Font awosome
import { faPenToSquare, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { pasarAMayusFrase } from '../../scripts/pasarAMayus';


function BotonesColeccion(props) {

    const { coleccion_id, nombre } = props.coleccion     //Obtine la id y el nombre

    const navigate = useNavigate();

    // Traducción

    const { t } = useTranslation();

    // Elimina la colección
    function eliminarColeccion() {

        // Pregunta si deseas eliminar la colección
        if (window.confirm(t("pregunta-eliminar-col"))) {
            // Elimna la coleccón
            fetch('/api/collection/remove-collection/' + coleccion_id, { method: 'DELETE' }).then((res) => {
                if (res.status === 204) {

                    // Alerta al usuario de que la colección ha sido eliminada correctamente
                    props.alertar({ texto: pasarAMayusFrase(nombre) + " " + t("col-eliminada"), tipo: "success" })
                } else {

                    // Alerta en caso de que se haya producido un error
                    props.alertar({ texto: t('col-no-eli'), tipo: "danger" })

                }
            }).catch(e => console.error(`Se ha producido un error: "`));

        }
    }

    return <div className='botones-coleccion' key={"BotonesColeccion" + coleccion_id}>

        {/* Nombre de la colección */}
        <span className='elipse'>{pasarAMayusFrase(nombre)}</span>

        {/* Botones de control de la colección */}
        <a role={"button"} href={'/colecciones/' + coleccion_id} className='btn btn-primary boton-coleccion'>{t('ver')} &nbsp;
            <FontAwesomeIcon icon={faEye} />
        </a>

        <button className='btn btn-warning boton-coleccion' onClick={() => navigate('/colecciones/editar', { state: { data: props.coleccion } })}>
            {t('editar')} &nbsp;<FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button className='btn btn-danger boton-coleccion' onClick={eliminarColeccion}>
            {t('editar')} &nbsp;<FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}

export default BotonesColeccion;