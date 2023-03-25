import React from "react";
import { useLocation } from "react-router-dom";
import ColeccionForm from "../components/ColeccionForm";
import Titulo from "../components/Titulo";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";


// Página para editar la colecció pasada por Navigate
function EditarColeccion() {

    // Inicializa la localización
    const location = useLocation();

    // Obtine la colección
    const coleccion = location.state.data;

    return <><Titulo text={"MODIFICAR: \"" + coleccion.nombre.toUpperCase() + "\""} />

        <ColeccionForm coleccion={coleccion} texto="Guardar" ruta={'/api/collection/edit-collection'} ico={faFloppyDisk}></ColeccionForm>

    </>

}

export default EditarColeccion;