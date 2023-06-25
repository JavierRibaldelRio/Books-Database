// Crea el area de edición del libro

import BookForm from "../components/BookForm";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';
import Titulo from "../components/Titulo";
import { useTranslation } from "react-i18next";


function Editar() {

    // Obtiene la traducción
    const { t } = useTranslation();

    // Obtiene la localización y el navigate
    const location = useLocation();
    const navigate = useNavigate();

    //Obtiene el objeto libro
    let libro = location.state.data;

    // Transforma la lista de objetos colecciones en lista de id de las colecciones selccionadas

    libro.colecciones = libro.colecciones.map(col => col.coleccion_id);

    return <>
        <Titulo text={t("modificar").toUpperCase() + ": \"" + libro.titulo.toUpperCase() + '"'} />


        <BookForm libro={libro} text={t("guardar")} ico={faFloppyDisk} ruta='/api/edit-book' navigate={navigate} />


    </>
}

export default Editar;