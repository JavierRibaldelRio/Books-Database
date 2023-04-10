
import Busqueda from "../components/Busqueda";
import Titulo from "../components/Titulo";

import { useTranslation } from "react-i18next"
function Buscar() {

    const { t } = useTranslation();

    return <>

        <Titulo text={t("buscar-libro")} />

        <Busqueda />

    </>
}

export default Buscar;