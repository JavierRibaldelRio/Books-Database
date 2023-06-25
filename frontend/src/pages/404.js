import { useTranslation } from "react-i18next";

import '../style/404.css';


function P404() {

    const { t } = useTranslation();

    return <div className="P404">

        <div className="error">ERR: 404</div>

        <div className="mensaje">{t('pa-no-en')}</div>

    </div>;

}

export default P404;