import MostrarLibros from '../components/MostrarLibros';
import Titulo from '../components/Titulo';
import { useTranslation } from "react-i18next";

function TablaLibros() {

    const { t } = useTranslation();


    return <>
        <Titulo text={t('tabla-libros')}></Titulo>

        <MostrarLibros mensajeError={t("no-connect-db")} />
    </>
}

export default TablaLibros;