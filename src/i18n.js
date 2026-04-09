import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import th from './locales/th';
import en from './locales/en';

const resources = {
  th: { translation: th },
  en: { translation: en },
};

const savedLanguage = localStorage.getItem('appLanguage') || 'th';

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'th',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
