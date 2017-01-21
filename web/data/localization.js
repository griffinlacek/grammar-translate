// web/data/initText
import LocalizedStrings from 'react-localization';

let localization = new LocalizedStrings({
  en:{
    code: 'en',
    defaultTrans: 'es',
    initInput:'Type or paste your own text here to get grammar suggestions & translation to the language of your choice.',
  },
  es: {
    code: 'es',
    defaultTrans: 'en',
    initInput:"Come vuoi il tuo uovo oggi?",
  }
});

export default localization;
