// Página del cliente para descargar

import Titulo from "../components/Titulo";

import { faArrowDown, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Descargar() {


    //Habrá qu ecambiarlo en un fututo
    let proxy = "http://127.0.0.1:5000";
    return <>
        <Titulo text="Descargar Datos"></Titulo>


        <div id="botones-mostrar" style={{ width: 50 + "%" }} >

            <a role="button" className="btn btn-primary" href={proxy + "/download-json"}>Descargar JSON &nbsp;<FontAwesomeIcon icon={faArrowDown} /></a><br />

            <a role="button" className="btn btn-secondary" href={proxy + "/download-db"}>Descargar DB &nbsp;<FontAwesomeIcon icon={faDatabase} /></a>

        </div>
    </>
}

export default Descargar;