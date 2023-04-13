import Form from 'react-bootstrap/Form';

import { useTranslation } from 'react-i18next';

// Muestra un select que elige el idioma
function SeleccionIdioma() {

    // Opciones para cambiar de idioma

    const { i18n, t } = useTranslation();

    // Alamacena la lengua que está en uso en est emomento
    const lenguaActual = i18n.language;

    const cambiarIdioma = (e) => {

        //Almacena la nueva lengua

        const lengua = e.target.value;

        i18n.changeLanguage(lengua);

        // Guarda la lengua
        localStorage.setItem('lang', lengua);

    }

    // Almacena todas las lenguas registradas y sus abreviaturas
    const lenguas = [['en', 'English'], ['es', 'Español'], ['cat', 'Valencià']]

    // Crea las lenguas y selecciona la actual
    const opciones = lenguas.map(x => <option key={x[0]} value={x[0]}>{x[1]}</option>
    )




    return <Form.Group md="5">
        <Form.Label>
            {t("idioma")}:
        </Form.Label>
        <Form.Select onChange={cambiarIdioma} defaultValue={lenguaActual}>
            <option />
            {opciones}
        </Form.Select>
    </Form.Group>

}

export default SeleccionIdioma;