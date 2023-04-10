import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';

import { useParams } from 'react-router-dom';
import MostrarLibros from '../components/MostrarLibros';
import EstiloColeccion from '../classes/EstiloEtiquetaColeccion';

import { useTranslation } from "react-i18next";


function VerColeccion() {

    //Obtiene la id de la colección de la url
    const { id } = useParams();

    // Traducciones
    const { t } = useTranslation();


    // Inicializa el estado
    const [colecciones, setColecciones] = useState({});

    useEffect(() => {


        fetch('/api/collection/fetch-coleccion/' + id).then(res => res.json()).then(colecciones => setColecciones(colecciones)).catch(err => console.log('err :>> ', err))
    }, [id]);

    let nombreColeccion = "", color = "black", items = 0;

    try {

        nombreColeccion = colecciones.coleccion.nombre;

        color = colecciones.coleccion.color;

        items = colecciones.contenido.length;
    }
    catch (e) { }



    return <>

        <Titulo text={<>{t("coleccion")}: <span id='nombre-coleccion' style={new EstiloColeccion(color)}> <span className='blanquear-fondo' style={{ margin: "2vmin", padding: "2vmin" }} >{nombreColeccion}</span></span></>
        } />

        <li>{t("libros-en-coleccion")} <strong>{items}</strong></li >

        <MostrarLibros query={colecciones.contenido} mensajeError={t("no-libros-col")} />
    </>
}

export default VerColeccion;