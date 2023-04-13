
import Titulo from '../components/Titulo';
import SeleccionIdioma from '../components/SeleccionIdioma';

import { useTranslation } from 'react-i18next';
// Página de configuración del proyecto
function Configuracion() {

    // Herramienta para traducit
    const { t } = useTranslation();

    return <> <Titulo text={t("configuracion")}></Titulo>

        <div id='panel-configuracion' className='flex-center'>

            <SeleccionIdioma />

        </div>

    </>
}

export default Configuracion