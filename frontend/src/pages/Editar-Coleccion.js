import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColeccionForm from "../components/ColeccionForm";
import Titulo from "../components/Titulo";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";


// Página para editar la colecció pasada por Navigate
function EditarColeccion() {

    const { t } = useTranslation();


    // Inicializa la localización
    const location = useLocation();

    // Inicializa el navigate

    const navigate = useNavigate();

    // Obtine la colección
    const coleccion = location.state.data;

    return <>

        <Titulo text={t("modificar").toUpperCase() + ": \"" + coleccion.nombre.toUpperCase() + "\""} />

        <ColeccionForm coleccion={coleccion} texto={t("guardar")} ruta={'/api/collection/edit-collection'} ico={faFloppyDisk} navigate={navigate} />

    </>

}

export default EditarColeccion;