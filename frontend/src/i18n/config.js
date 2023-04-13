// Archivo que configura las traducciones
// https://www.freecodecamp.org/news/how-to-add-localization-to-your-react-app/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({

    fallbackLng: 'es',
    lng: 'cat',
    resources: {
        en: {
            translations: require('./locales/en/translations.json')
        },
        es: {
            translations: require('./locales/es/translations.json')
        },
        cat: {
            translations: require('./locales/cat/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'

});

i18n.languages = ["en", "es"];


export default i18n;
