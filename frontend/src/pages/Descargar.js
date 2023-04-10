// Página del cliente para descargar

import Titulo from "../components/Titulo";

import { faArrowDown, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";


function Descargar() {

    const { t } = useTranslation();

    //Habrá qu ecambiarlo en un fututo
    let proxy = "http://127.0.0.1:5000";
    return <>
        <Titulo text={t("descargar-datos")}></Titulo>


        <div id="botones-mostrar" style={{ width: 50 + "%" }} >

            <a role="button" className="btn btn-primary" href={proxy + "/download-json"}>{t("descargar-json")} &nbsp;<FontAwesomeIcon icon={faArrowDown} /></a><br />

            <a role="button" className="btn btn-secondary" href={proxy + "/download-db"}>{t("descargar-db")} &nbsp;<FontAwesomeIcon icon={faDatabase} /></a>

        </div>
    </>
}

export default Descargar;