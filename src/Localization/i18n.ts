import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import tr from "./tr.json";
import es from "./es.json";
import de from "./de.json";
import zh from "./zh.json";
import ar from "./ar.json";
import ln from "./ln.json";
import sw from "./sw.json";
import ru from "./ru.json";
import ja from "./ja.json";
import it from "./it.json";
import hi from "./hi.json";
import pt from "./pt.json";

const LANGUAGES = {
    en: { translation: en },
    fr: { translation: fr },
    tr: { translation: tr },
    es: { translation: es },
    de: { translation: de },
    ar: { translation: ar },
    hi: { translation: hi },
    it: { translation: it },
    ja: { translation: ja },
    ln: { translation: ln },
    pt: { translation: pt },
    ru: { translation: ru },
    zh: { translation: zh },
    sw: { translation: sw },
};

i18n.use(initReactI18next).init({
    resources: LANGUAGES,
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false, // React already does escaping
    },
});

export default i18n;
