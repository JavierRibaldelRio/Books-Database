import React from 'react';
import esFecha from '../../scripts/esFecha';
import pasarAMayusPalabra, { pasarAMayusFrase } from '../../scripts/pasarAMayus';
import transformarFecha from '../../scripts/transformarFecha';


// Muestra una tabla con los datos de la base de datos
function MostrarDBData(props) {

    //Obtiene los datos
    let { autor, idioma, libro_id, fecha_finalizacion, fecha_inicio } = props.data;


    // Formatea los datos
    idioma = pasarAMayusPalabra(idioma);
    autor = pasarAMayusFrase(autor);

    // Define dias
    let dias = undefined;

    // Si hay dos fechas calcula el número de días de lectura
    if (esFecha(fecha_inicio) && esFecha(fecha_finalizacion)) {

        let resta = (new Date(fecha_finalizacion).getTime() - new Date(fecha_inicio).getTime()) / 1000 / 60 / 60 / 24;

        console.log('resta :>> ', resta);

        dias = <tr>
            <th>Días de Lectura:</th>

            <td>{resta}</td>
        </tr>

    }

    // Muestra la tabla
    return <table className='tabla-data table-data-database'>
        <tbody>
            <tr>
                <th>ID:</th>

                <td>{libro_id}</td>
            </tr>
            <tr>
                <th>Autor:</th>

                <td>{autor}</td>
            </tr>
            <tr>
                <th>Idioma:</th>

                <td>{idioma}</td>
            </tr>
            {dias}
            <tr>
                <th>Fecha Inicio:</th>

                <td>{transformarFecha(fecha_inicio)}</td>
            </tr>
            <tr>
                <th>Fecha Finalización:</th>

                <td>{transformarFecha(fecha_finalizacion)}</td>
            </tr>

        </tbody>
    </table>;
}

export default MostrarDBData;