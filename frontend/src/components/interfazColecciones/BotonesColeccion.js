import React from 'react';

// Font awosome
import { faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { pasarAMayusFrase } from '../../scripts/pasarAMayus';

import Alerta from '../../classes/Alerta';

import BotonEliminar from '../BotonEliminar';


function BotonesColeccion(props) {

    const { coleccion_id, nombre } = props.coleccion     //Obtine la id y el nombre

    const navigate = useNavigate();

    // Traducción

    const { t } = useTranslation();


    // Elimina la colección
    function eliminarColeccion() {

        // Elimna la coleccón
        fetch('/api/collection/remove-collection/' + coleccion_id, { method: 'DELETE' }).then((res) => {
            if (res.status === 204) {

                const texto = pasarAMayusFrase(nombre) + " " + t("col-eliminada");

                // Alerta al usuario de que la colección ha sido eliminada correctamente
                props.alertar(new Alerta(true, texto, "success"));


            } else {

                // Alerta en caso de que se haya producido un error
                props.alertar(new Alerta(true, t('col-no-eli'), "danger"))

            }
        }).catch(e => console.error(`Se ha producido un error: "`));
    }

    return <div className='botones-coleccion' key={"BotonesColeccion" + coleccion_id}>

        {/* Nombre de la colección */}
        <span className='elipse'>{pasarAMayusFrase(nombre)}</span>

        {/* Botones de control de la colección */}
        <Link role={"button"} to={'/colecciones/' + coleccion_id} className='btn btn-primary boton-coleccion'>{t('ver')} &nbsp;
            <FontAwesomeIcon icon={faEye} />
        </Link>

        <button className='btn btn-warning boton-coleccion' onClick={() => navigate('/colecciones/editar', { state: { data: props.coleccion } })}>
            {t('editar')} &nbsp;<FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <BotonEliminar
            coleccion={nombre}
            alertar={props.alertar}
            alCerrar={props.mostrarTitulo}
            eliminar={eliminarColeccion}
            texto={{ body: t("pregunta-eliminar-col"), titulo: <>{t("eliminar")}: {pasarAMayusFrase(nombre)} </> }}
            botonProps={'boton-coleccion'} />

    </div>
}

export default BotonesColeccion;