
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANGUAGE={
    en:{

    },
    fr:{

    }
}

i18n.use(initReactI18next).init({
    resources:LANGUAGE,
    fallbackLng: "en",
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