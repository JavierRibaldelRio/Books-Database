// Añade el libro a la base de datos

import BookForm from "../components/BookForm";
import Titulo from "../components/Titulo";

function AddBook() {


    return <>

        <Titulo text="AÑADIR LIBRO" />

        <BookForm />

    </>;
}

export default AddBook;