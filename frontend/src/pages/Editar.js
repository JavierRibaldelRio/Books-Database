// Crea el area de edición del libro

import BookForm from "../components/BookForm";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import Titulo from "../components/Titulo";
import { useTranslation } from "react-i18next";


function Editar() {

    const { t } = useTranslation();


    const location = useLocation();

    const libro = location.state.data;
    return <>
        <Titulo text={t("modificar").toUpperCase() + ": \"" + libro.titulo.toUpperCase() + '"'} />


        <BookForm libro={libro} text={t("guardar")} ico={faFloppyDisk} ruta='/api/edit-book' />


    </>
}

export default Editar;