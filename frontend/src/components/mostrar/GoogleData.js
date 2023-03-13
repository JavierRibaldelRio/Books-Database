
import React from "react";
import '../../style/google_data.css'
import Alert from 'react-bootstrap/Alert';
import pasarAMayusPalabra from "../../scripts/pasarAMayus";


import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'


function MostrarGoogleData(props) {

    var atr = [new car('title', 'titulo'), new car('imageLinks', 'foto'), new car('description', 'sinopsis'), new car('averageRating', 'valoracion')];

    function anyadirFila(x) {


        let valor = props.data.volumeInfo[x.ruta];

        x.valor = valor;


        if ('foto' === x.nombre) {
            try {
                return <tr key={x.nombre}>
                    <td colSpan={2} className="img-fluid" id="portada"><img src={props.data.volumeInfo.imageLinks.thumbnail} alt={"Foto de la portada del libro"}></img></td>
                </tr>
            }
            catch {

                return;
            }
        }
        else if ('valoracion' === x.nombre && valor !== undefined) {

            try {
                return <tr id={x.nombre} key={x.nombre}>
                    <th>{pasarAMayusPalabra(x.nombre)}</th>
                    <td><Rating readOnly style={{ maxWidth: 150 }} key={x.nombre} value={valor} /></td></tr>;
            }
            catch {

                return;
            }
        }
        else if (valor !== undefined) {

            x.valor = valor;

            return <tr id={x.nombre} key={x.nombre}><th>{pasarAMayusPalabra(x.nombre)}</th><td>{valor}</td></tr>;

        }

        else {

            valor = null

            return;
        }

    }



    return <>
        <Alert key="success" variant="success">
            Información de <i>Google Books</i>
        </Alert>


        <table className='tabla-data table-data-database'>
            <tbody>

                {atr.map(anyadirFila)}
            </tbody>
        </table>
    </>
}


class car {


    constructor(ruta, nombre) {

        this.ruta = ruta;
        this.nombre = nombre;
    }

}

export default MostrarGoogleData;