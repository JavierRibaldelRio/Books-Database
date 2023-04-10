import React from 'react';
import EstiloColeccion from '../../classes/EstiloEtiquetaColeccion';
import esFecha from '../../scripts/esFecha';
import pasarAMayusPalabra, { pasarAMayusFrase } from '../../scripts/pasarAMayus';
import transformarFecha from '../../scripts/transformarFecha';


import '../../style/mostrar_libro.css';

import { useTranslation } from 'react-i18next';


// Muestra una tabla con los datos de la base de datos
function MostrarDBData(props) {

    //Traducción

    const { t } = useTranslation();

    //Obtiene los datos
    let { autor, idioma, libro_id, fecha_finalizacion, fecha_inicio, colecciones } = props.data;


    // Formatea los datos
    idioma = pasarAMayusPalabra(idioma);
    autor = pasarAMayusFrase(autor);

    // Define dias y las colecciones
    let dias = undefined, colHtml = undefined;

    // Si hay dos fechas calcula el número de días de lectura
    if (esFecha(fecha_inicio) && esFecha(fecha_finalizacion)) {

        let resta = (new Date(fecha_finalizacion).getTime() - new Date(fecha_inicio).getTime()) / 1000 / 60 / 60 / 24;

        console.log('resta :>> ', resta);

        dias = <tr>
            <th>{t("dias-lectura")}:</th>

            <td>{resta}</td>
        </tr>

    }

    if (colecciones.length !== 0) {

        colHtml = <tr id='tr-colecciones'>
            <th>{t("colecciones")}</th>

            < td id='celda-colecciones' >

                <ul>
                    {colecciones.map(x => <li key={x.coleccion_id} className="li-coleccion" style={new EstiloColeccion(x.color)}>

                        <div className="blanquear-fondo contenedor-enlace elipse" style={{ maxWidth: "20vw" }}>
                            <a href={"/colecciones/" + x.coleccion_id}>{pasarAMayusFrase(x.nombre)}&nbsp;
                            </a>
                        </div>
                    </li>)}
                </ul>
            </td>
        </tr >
    }

    // Muestra los datos
    return <table className='tabla-data table-data-database'>
        <tbody>
            <tr>
                <th>ID:</th>

                <td>{libro_id}</td>
            </tr>
            <tr>
                <th>{t("autor")}:</th>

                <td>{autor} </td>
            </tr>
            <tr>
                <th>{t("idioma")}:</th>

                <td>{idioma}</td>

            </tr>
            {colHtml}

            {dias}
            <tr>
                <th>{t("fecha-de-inicio")}:</th>

                <td>{transformarFecha(fecha_inicio)}</td>
            </tr>
            <tr>
                <th>{t("fecha-de-finalizacion")}:</th>

                <td>{transformarFecha(fecha_finalizacion)}</td>
            </tr>



        </tbody>
    </table>;
}

export default MostrarDBData;