// web/data/initText
import LocalizedStrings from 'react-localization';

let localization = new LocalizedStrings({
  en: {
    code: 'en',
    defaultTrans: 'es',
    initInput: 'Type or paste your own text here to get grammar suggestions & translation to the language of your choice.',
  },
  fr: {
    code: 'fr',
    defaultTrans: 'en',
    initInput: 'Ecrire un texte ici pour obtenir des suggestions de grammair.'
  },
  es: {
    code: 'es',
    defaultTrans: 'en',
    initInput: 'Escriba un texto aquí.'
  }
});

export default localization;
