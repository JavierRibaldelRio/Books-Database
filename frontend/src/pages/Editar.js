// Crea el area de edición del libro

import BookForm from "../components/BookForm";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import Titulo from "../components/Titulo";

function Editar() {

    const location = useLocation();

    const libro = location.state.data;
    return <>
        <Titulo text={"MODIFICAR: \"" + libro.titulo.toUpperCase() + '"'} />


        <BookForm libro={libro} text="Guardar" ico={faFloppyDisk} ruta='/api/edit-book' />


    </>
}

export default Editar;