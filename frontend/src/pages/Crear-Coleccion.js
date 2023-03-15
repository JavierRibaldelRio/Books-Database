
import ColeccionForm from '../components/ColeccionForm';
import Titulo from '../components/Titulo'

import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Página que crea una coleccion

function CrearColeccion() {


    return <>
        <Titulo text="Crear Nueva Colección" />

        <ColeccionForm texto="Crear Coleción" ico={faPlus} ruta="/api/collection/create-collection" />
    </>
}

export default CrearColeccion;