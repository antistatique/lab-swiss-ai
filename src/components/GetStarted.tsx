import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useIsPresent } from 'framer-motion';
import parse from 'html-react-parser';
import i18next from 'i18next';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Maya from '@/components/Maya';
import PaperFront from '@/components/PaperFront';
import languages from '@/locales/languages.json';

type Props = {
  started: boolean;
  onStart: () => void;
};

const GetStarted = ({ onStart, started }: Props): JSX.Element => {
  const { t, i18n } = useTranslation();
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 bg-stone-900/50 z-[99]"
    >
      <motion.div
        className="fixed bottom-0 left-0 flex justify-center w-full max-h-screen pt-10 overflow-y-auto"
        initial={{ y: 0 }}
        animate={{ y: isPresent ? 0 : '100vh' }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative w-[340px]">
          <PaperFront withClip>
            <h2 className="py-1 font-bold border-b border-t-[3px] border-stone-900">
              {t('intro.subtitle')}
            </h2>
            <div className="flex items-center justify-between mt-4">
              <h1 className="font-serif text-xl">{parse(t('intro.title'))}</h1>
              <Maya />
            </div>
            <p className="mt-4">{t('intro.welcome')}</p>
            <p className="mt-4 prose-a:underline prose-a:transition-colors hover:prose-a:text-orange-600 prose-a:underline-offset-4 prose-a:decoration-1">
              {parse(t('intro.credits'))}
            </p>
          </PaperFront>
          <Divider />
          <div className="p-4 shadow bg-stone-100">
            <h2 className="font-bold">{t('intro.howto_title')}</h2>
            <div className="flex items-center px-4 py-2 mt-3 bg-stone-200 gap-4">
              <img src="/vectors/mouse-left.svg" alt="mouse left schema" />
              <span>
                <h3 className="font-bold">{t('intro.mouse_left')}</h3>
                <span>{t('intro.move')}</span>
              </span>
            </div>
            <div className="flex items-center px-4 py-2 bg-stone-200 gap-4 mt-1.5">
              <img src="/vectors/mouse-right.svg" alt="mouse right schema" />
              <span>
                <h3 className="font-bold">{t('intro.mouse_right')}</h3>
                <span>{t('intro.rotate')}</span>
              </span>
            </div>
            <div className="flex items-center px-4 py-2 bg-stone-200 gap-4  mt-1.5">
              <img src="/vectors/mouse-wheel.svg" alt="mouse wheel schema" />
              <span>
                <h3 className="font-bold">{t('intro.mouse_wheel')}</h3>
                <span>{t('intro.zoom')}</span>
              </span>
            </div>
          </div>
          <Divider />
          <div className="p-4 shadow bg-stone-100">
            <select
              className="w-full mb-3 bg-stone-100"
              defaultValue={i18n.language}
              onChange={({ target }) => i18next.changeLanguage(target.value)}
            >
              {Object.keys(languages).map(key => (
                <option key={`lang-${key}`} value={key}>
                  {languages[key as keyof typeof languages]}
                </option>
              ))}
            </select>
            <Button onClick={onStart}>
              {started ? t('intro.continue') : t('intro.begin')}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GetStarted;
