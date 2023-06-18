
import ColeccionForm from '../components/ColeccionForm';
import Titulo from '../components/Titulo'

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next"

import { useNavigate } from 'react-router-dom';


// Página que crea una coleccion

function CrearColeccion() {

    const { t } = useTranslation()



    return <>
        <Titulo text={t("crear-nueva-coleccion")} />

        <ColeccionForm texto={t("crear-coleccion")} ico={faPlus} ruta="/api/collection/create-collection" navigate={useNavigate()} />
    </>
}

export default CrearColeccion;