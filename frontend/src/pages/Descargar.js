// Página del cliente para descargar

import Titulo from "../components/Titulo";

import { faArrowDown, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

// Muestra los botones para descargar
function Descargar() {

    const { t } = useTranslation();

    // Funciones de descarga
    const handleClickJson = () => fetch('/download-json').then(res => res.blob())
        .then(blob => {
            let file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });

    const handleClickDB = () => fetch('/download-db').then(res => res.blob())
        .then(blob => {
            let file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });

    return <>
        <Titulo text={t("descargar-datos")}></Titulo>


        <div id="botones-mostrar" style={{ width: 50 + "%" }} >

            <button className="btn btn-primary" onClick={handleClickJson}>{t("descargar-json")} &nbsp;<FontAwesomeIcon icon={faArrowDown} /></button><br />
            <button className="btn btn-secondary" onClick={handleClickDB}>{t("descargar-db")} &nbsp;<FontAwesomeIcon icon={faDatabase} /></button>

        </div>
    </>
}

export default Descargar;