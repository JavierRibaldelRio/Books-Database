import { useLocation } from "react-router-dom";
import Busqueda from "../components/Busqueda";
import Titulo from "../components/Titulo";

import { useTranslation } from "react-i18next"
function Buscar() {

    const { t } = useTranslation();

    // Activa la localización
    const location = useLocation();

    const libro = location.state || '';




    return <>

        <Titulo text={t("buscar-libro")} />

        <Busqueda libroABuscar={libro} />

    </>
}

export default Buscar;