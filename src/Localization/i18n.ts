
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "./en.json"
import fr from "./fr.json"
import tr from "./tr.json"
import es from "./es.json"

const LANGUAGE={
    en:{
        translation: en
    },
    fr:{
        translation: fr
    },
    tr:{
        translation: tr
    },
    es:{
        translation: es
    }


}

i18n.use(initReactI18next).init({
    resources:LANGUAGE,
    fallbackLng: "tr",
    defaultNS: "translation",
    ns: ["translation"],
    react:{
        useSuspense:false
    },
    interpolation: {
        escapeValue: false // React already does escaping
    },
})

export default i18n