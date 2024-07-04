import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

import am from './am.json';
import ar from './ar.json';
import bg from './bg.json';
import bn from './bn.json';
import bs from './bs.json';
import ca from './ca.json';
import cs from './cs.json';
import da from './da.json';
import de from './de.json';
import el from './el.json';
import en from './en.json';
import es from './es.json';
import et from './et.json';
import fi from './fi.json';
import fr from './fr.json';
import gu from './gu.json';
import hi from './hi.json';
import hr from './hr.json';
import hu from './hu.json';
import hy from './hy.json';
import id from './id.json';
import is from './is.json';
import it from './it.json';
import ja from './ja.json';
import ka from './ka.json';
import kk from './kk.json';
import kn from './kn.json';
import ko from './ko.json';
import lt from './lt.json';
import lv from './lv.json';
import mk from './mk.json';
import ml from './ml.json';
import mn from './mn.json';
import mr from './mr.json';
import ms from './ms.json';
import my from './my.json';
import nb from './nb.json';
import nl from './nl.json';
import pa from './pa.json';
import pl from './pl.json';
import pt from './pt.json';
import ro from './ro.json';
import ru from './ru.json';
import sk from './sk.json';
import sl from './sl.json';
import so from './so.json';
import sq from './sq.json';
import sr from './sr.json';
import sv from './sv.json';
import sw from './sw.json';
import ta from './ta.json';
import te from './te.json';
import th from './th.json';
import tl from './tl.json';
import tr from './tr.json';
import uk from './uk.json';
import ur from './ur.json';
import vi from './vi.json';
import zh from './zh.json';

i18next.use(initReactI18next).init(
  {
    lng: 'fr',
    fallbackLng: 'fr',
    returnEmptyString: false,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react
      format: (value, format) => {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      },
    },
    resources: {
      am: { translation: { ...am } },
      ar: { translation: { ...ar } },
      bg: { translation: { ...bg } },
      bn: { translation: { ...bn } },
      bs: { translation: { ...bs } },
      ca: { translation: { ...ca } },
      cs: { translation: { ...cs } },
      da: { translation: { ...da } },
      de: { translation: { ...de } },
      el: { translation: { ...el } },
      en: { translation: { ...en } },
      es: { translation: { ...es } },
      et: { translation: { ...et } },
      fi: { translation: { ...fi } },
      fr: { translation: { ...fr } },
      gu: { translation: { ...gu } },
      hi: { translation: { ...hi } },
      hr: { translation: { ...hr } },
      hu: { translation: { ...hu } },
      hy: { translation: { ...hy } },
      id: { translation: { ...id } },
      is: { translation: { ...is } },
      it: { translation: { ...it } },
      ja: { translation: { ...ja } },
      ka: { translation: { ...ka } },
      kk: { translation: { ...kk } },
      kn: { translation: { ...kn } },
      ko: { translation: { ...ko } },
      lt: { translation: { ...lt } },
      lv: { translation: { ...lv } },
      mk: { translation: { ...mk } },
      ml: { translation: { ...ml } },
      mn: { translation: { ...mn } },
      mr: { translation: { ...mr } },
      ms: { translation: { ...ms } },
      my: { translation: { ...my } },
      nb: { translation: { ...nb } },
      nl: { translation: { ...nl } },
      pa: { translation: { ...pa } },
      pl: { translation: { ...pl } },
      pt: { translation: { ...pt } },
      ro: { translation: { ...ro } },
      ru: { translation: { ...ru } },
      sk: { translation: { ...sk } },
      sl: { translation: { ...sl } },
      so: { translation: { ...so } },
      sq: { translation: { ...sq } },
      sr: { translation: { ...sr } },
      sv: { translation: { ...sv } },
      sw: { translation: { ...sw } },
      ta: { translation: { ...ta } },
      te: { translation: { ...te } },
      th: { translation: { ...th } },
      tl: { translation: { ...tl } },
      tr: { translation: { ...tr } },
      uk: { translation: { ...uk } },
      ur: { translation: { ...ur } },
      vi: { translation: { ...vi } },
      zh: { translation: { ...zh } },
    },
  },
  err => {
    if (err) console.log('I18Next error :', err);
  }
);

export default i18next;
