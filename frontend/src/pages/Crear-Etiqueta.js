
import EtiquetaForm from '../components/EtiquetaForm';
import Titulo from '../components/Titulo'

import { faPlus } from "@fortawesome/free-solid-svg-icons";
// Página que crea una etiqueta

function CrearEtiqueta() {


    return <>
        <Titulo text="Crear Nueva Etiqueta" />

        <EtiquetaForm texto="Crear Etiqueta" ico={faPlus} ruta="/tags/create-tag" />
    </>
}

export default CrearEtiqueta;