
import InterfazColecciones from '../components/InterfazColecciones';
import Titulo from '../components/Titulo'
import { useTranslation } from "react-i18next";

import { useLocation } from 'react-router-dom';


function MostrarColecciones() {

    // Traducciones
    const { t } = useTranslation();

    const location = useLocation();



    return <>
        <Titulo text={t("colecciones")} />

        <InterfazColecciones alerta={(location.state !== null) ? location.state : undefined} />

    </>
}

export default MostrarColecciones;