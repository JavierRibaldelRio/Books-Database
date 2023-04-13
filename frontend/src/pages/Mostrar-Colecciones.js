
import InterfazColecciones from '../components/InterfazColecciones';
import Titulo from '../components/Titulo'
import { useTranslation } from "react-i18next";


function MostrarColecciones() {

    // Traducciones
    const { t } = useTranslation();


    return <><Titulo text={t("colecciones")} />

        <InterfazColecciones />

    </>
}

export default MostrarColecciones;