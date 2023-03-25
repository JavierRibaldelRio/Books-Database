import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';

import { useParams } from 'react-router-dom';
import MostrarLibros from '../components/MostrarLibros';
import elegirColorLetra from '../scripts/elegirColorLetra';
import EstiloColeccion from '../classes/EstiloEtiquetaColeccion';

function VerColeccion() {

    //Obtiene la id de la colección de la url
    const { id } = useParams();


    // Inicializa el estado
    const [colecciones, setColecciones] = useState({});

    useEffect(() => {


        fetch('/api/collection/fetch-coleccion/' + id).then(res => res.json()).then(colecciones => setColecciones(colecciones)).catch(err => console.log('err :>> ', err))
    }, []);

    let nombreColeccion = "", color = "black", items = 0;

    try {

        nombreColeccion = colecciones.coleccion.nombre;

        color = colecciones.coleccion.color;

        items = colecciones.contenido.length;
    }
    catch (e) { }



    return <>

        <Titulo text={<>Colección: <span id='nombre-coleccion' style={new EstiloColeccion(color)}> <span className='blanquear-fondo' style={{ margin: "2vmin", padding: "2vmin" }} >{nombreColeccion}</span></span></>
        } />

        < li > Libros en la colección: <strong>{items}</strong></li >

        <MostrarLibros query={colecciones.contenido} mensajeError="La colección no contiene ningún libro" />
    </>
}

export default VerColeccion;