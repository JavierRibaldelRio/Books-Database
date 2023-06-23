// Genera la fecha de acuerdo con el locale

import { useTranslation } from "react-i18next";

function Fecha() {

    //Almacena el locale a utilizar

    const { i18n } = useTranslation();

    const locale = i18n.language;



    return <span className="fecha">{new Date().toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>;
}

export default Fecha;