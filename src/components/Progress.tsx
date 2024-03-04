import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useIsPresent } from 'framer-motion';
import { range } from 'ramda';

import Maya from '@/components/Maya';
import PaperFront from '@/components/PaperFront';
import useInterval from '@/hooks/useInterval';
import cm from '@/utils/cm';

type Props = {
  location: string;
  speed: number;
};

const Progress = ({ location, speed }: Props): JSX.Element => {
  const [speak, setSpeak] = useState(true);
  const [progression, setProgression] = useState<number>(speed);
  const isPresent = useIsPresent();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setSpeak(false);
    }, 2000);
  }, []);

  useInterval(
    () => {
      setProgression(i => i - 100);
    },
    progression <= 0 ? null : 100
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed bottom-0 right-0 w-[395px]"
    >
      <motion.div
        className="flex flex-col px-5"
        initial={{ y: '100vh' }}
        animate={{ y: isPresent ? 0 : '100vh' }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mt-10">
          <PaperFront withClip>
            <h2 className="py-1 font-bold border-t-[3px] border-stone-900">
              {t('progress.heading_for')}
            </h2>
            <h1 className="font-serif text-xl">{location}</h1>

            <div className="flex justify-between py-4">
              {range(0, 44).map(i => (
                <span
                  key={`progress-${i}`}
                  className={cm(
                    'w-1 h-1 rounded-full bg-stone-300',
                    44 - Math.round((progression * 44) / speed) > i &&
                      'bg-orange-500'
                  )}
                />
              ))}
            </div>

            <div>
              <span className="float-left pr-10 -mx-8 -mt-2">
                <Maya speak={speak} />
              </span>
              <p className="mt-2">{t('progress.enjoy_the_view')}</p>
            </div>
          </PaperFront>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Progress;
