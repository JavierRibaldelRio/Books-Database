import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';


function Contadores() {

    // Estados
    const [data, setData] = useState({});


    useEffect(() => {
        fetch('/api/data/fetch-datos-generales').then(res => res.json()).then(data => setData(data)).catch(err => console.log('err :>> ', err))
    }, []);

    // Traducciones

    const { t } = useTranslation();

    return <>

        <ul id='contadores'>
            <li><strong>{t("libros")}: </strong>{Number(data.libros).toLocaleString() || ''}</li>
            <li><strong>{t("colecciones")}: </strong>{Number(data.colecciones).toLocaleString() || ''}</li>
            <li><strong>{t("media-dias-libro")}: </strong>{Number(data.media).toLocaleString() || ''}</li>
        </ul></>

}

export default Contadores