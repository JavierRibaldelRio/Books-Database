
import React from "react";
import '../../style/google_data.css'
import pasarAMayusPalabra from "../../scripts/pasarAMayus";


import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import AlertaCerrable from "../AlertaCerrable";

import { Trans, useTranslation } from "react-i18next";

function MostrarGoogleData(props) {

    const { t } = useTranslation()

    var atr = [new car('title', t("titulo")), new car('imageLinks', 'foto'), new car('description', t("sinopsis")), new car('averageRating', t('valoracion'))];

    function anyadirFila(x) {


        let valor = props.data.volumeInfo[x.ruta];

        x.valor = valor;


        if ('imageLinks' === x.ruta) {
            try {
                return <tr key={x.ruta}>
                    <td colSpan={2} className="img-fluid" id="portada"><img src={props.data.volumeInfo.imageLinks.thumbnail} alt={t("alt-portada")}></img></td>
                </tr>
            }
            catch {

                return;
            }
        }
        else if ('averageRating' === x.ruta && valor !== undefined) {

            try {
                return <tr id={x.ruta} key={x.ruta}>
                    <th>{pasarAMayusPalabra(x.nombre)}</th>
                    <td><Rating readOnly style={{ maxWidth: 150 }} key={x.nombre} value={valor} /></td></tr>;
            }
            catch {

                return;
            }
        }
        else if (valor !== undefined) {

            x.valor = valor;

            return <tr id={x.ruta} key={x.ruta}><th>{pasarAMayusPalabra(x.nombre)}</th><td>{valor}</td></tr>;

        }

        else {

            valor = null

            return;
        }

    }



    return <>
        <AlertaCerrable tipo="success" texto={<Trans>info-google</Trans>} />


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