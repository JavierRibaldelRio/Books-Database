import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { pasarAMayusFrase } from '../../scripts/pasarAMayus';


// Crea un link de la cabecera

function LinkCabecera(props) {

    const { ruta, traduccion, ico } = props.link;

    const { t } = useTranslation();

    return <Link className='nav-link' role="button" to={ruta}><FontAwesomeIcon icon={ico} /> &nbsp;{pasarAMayusFrase(t(traduccion))}</Link>
}

export default LinkCabecera;