// Añade el libro a la base de datos

import BookForm from "../components/BookForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Titulo from "../components/Titulo";

import { useTranslation } from "react-i18next";

function AddBook() {
    //Traducción
    const { t } = useTranslation();

    return <>

        <Titulo text={t("anyadir-libro")} />

        <BookForm text={t("Anyadir-libro")} ruta='/api/add-book' ico={faPlus} />

    </>;
}

export default AddBook;