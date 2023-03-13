// Añade el libro a la base de datos

import BookForm from "../components/BookForm";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Titulo from "../components/Titulo";

function AddBook() {


    return <>

        <Titulo text="AÑADIR LIBRO" />

        <BookForm text="Añadir libro" ruta='/api/add-book' ico={faPlus} />

    </>;
}

export default AddBook;