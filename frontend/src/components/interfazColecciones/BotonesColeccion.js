import React from 'react';

// Font awosome
import { faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate, Link } from 'react-router-dom';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { pasarAMayusFrase } from '../../scripts/pasarAMayus';
import BotonEliminar from './BotonEliminarColeccion';


function BotonesColeccion(props) {

    const [mostrar, setMostrar] = useState(false)

    const { coleccion_id, nombre } = props.coleccion     //Obtine la id y el nombre

    const navigate = useNavigate();

    // Traducción

    const { t } = useTranslation();

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

        <BotonEliminar coleccion={nombre} id={coleccion_id} alertar={props.alertar} mostrarTitulo={props.mostrarTitulo} />
    </div>
}

export default BotonesColeccion;