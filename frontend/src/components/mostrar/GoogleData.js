
import React from "react";
import '../../style/google_data.css'
import Alert from 'react-bootstrap/Alert';
import pasarAMayusPalabra from "../../scripts/pasarAMayus";


function MostrarGoogleData(props) {

    var atr = [new car('title', 'titulo'), new car('imageLinks', 'foto'), new car('description', 'sinopsis'), new car('averageRating', 'valoracion')];

    function anyadirFila(x) {


        let valor = props.data.volumeInfo[x.ruta];

        if ('foto' === x.nombre) {
            try {
                return <tr>
                    <td colSpan={2} className="img-fluid" id="portada"><img src={props.data.volumeInfo.imageLinks.thumbnail}></img></td>
                </tr>
            }
            catch {

                return <></>
            }
        }
        else if (valor !== undefined) {

            x.valor = valor;

            return <tr id={x.nombre} key={x.nombre}><th>{pasarAMayusPalabra(x.nombre)}</th><td>{valor}</td></tr>;

        }

        else {

            valor = null

            return <></>;
        }

    }

    atr.forEach(anyadirFila);

    console.log('atr :>> ', atr);

    return <>
        <Alert key="success" variant="success">

            Se ha encontrado en Google books
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




