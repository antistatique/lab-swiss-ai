import React from 'react';
import { useTranslation } from 'react-i18next';

import cm from '@/utils/cm';

type Props = {
  setGuided: (guided: boolean) => void;
  guided: boolean;
  playing: boolean;
};

const Controls = ({ guided, setGuided, playing }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 z-50 left-1/2 -translate-x-1/2">
      <div className="flex p-4">
        <button
          type="button"
          className={cm(
            'inline-block px-4 pt-2.5 pb-2 font-bold shadow bg-stone-200 border-b-[3px] border-stone-200 disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed group',
            !guided && 'border-orange-500 bg-stone-100'
          )}
          onClick={() => setGuided(false)}
          disabled={playing}
        >
          {t('modes.free')}
        </button>
        <button
          type="button"
          className={cm(
            'inline-block px-4 pt-2 pb-1.5 font-bold shadow bg-stone-200 border-b-[3px] border-stone-200 disabled:bg-stone-200 disabled:text-stone-500 disabled:cursor-not-allowed group',
            guided && 'border-orange-500 bg-stone-100'
          )}
          onClick={() => setGuided(true)}
          disabled={playing}
        >
          {t('modes.guided')}
        </button>
      </div>
    </div>
  );
};

export default Controls;
