import React from 'react';
import { useTranslation } from 'react-i18next';

import cm from '@/utils/cm';

type Props = {
  setGuided: (guided: boolean) => void;
  setInfoOpen: (open: boolean) => void;
  guided: boolean;
  playing: boolean;
};

const Controls = ({
  guided,
  setGuided,
  playing,
  setInfoOpen,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
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

      <div className="fixed bottom-0 left-0 z-50 m-4">
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-black/10 transition-colors hover:bg-black/40 backdrop-blur grid place-content-center text-stone-100"
          onClick={() => setInfoOpen(true)}
        >
          <svg
            viewBox="0 0 20 20"
            width={20}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow"
          >
            <path
              d="M10.001 13.333V10m0-3.333h.008m-.008 11.666a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Controls;
