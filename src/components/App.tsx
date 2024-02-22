'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { identity, isNotNil } from 'ramda';

import Chat from '@/components/Chat';
import GetStarted from '@/components/GetStarted';
import Map from '@/components/Map';
// import Tour from '@/components/Tour';
import routes from '@/config/routes';
import type { Location } from '@/types/Location';
import { RouteName } from '@/types/Routes';
import cm from '@/utils/cm';

import '@/locales/i18n';

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();

  const [started, setStarted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRoute, setCurrentRoute] = useState<RouteName | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [playing, setPlaying] = useState(false);
  const [stop, setStop] = useState<(() => void) | null>();
  const [guided, setGuided] = useState(false);

  // const handleStop = () => {
  //   if (isNotNil(stop)) {
  //     stop();
  //     setStop(null);
  //   }
  // };

  const handleAnimationComplete = (s: () => void) => {
    if (isNotNil(currentRoute)) {
      setPlaying(false);
      setStop(() => s);

      setLocation({
        name: routes[currentRoute].location,
        coordinates: {
          lng: 6.5,
          lat: 46.5,
        },
        elevation: 1500,
      });
    }
  };

  // const handleSelectRoute = (route: RouteName) => {
  //   setCurrentRoute(route);
  //   setPlaying(true);
  //   if (isNotNil(stop)) {
  //     stop();
  //     setStop(null);
  //   }
  // };

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        // handleSelectRoute('step1');
      }, 400);
    }
  }, [started]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {!started && <GetStarted onStart={() => setStarted(true)} />}
      </AnimatePresence>
      <div className="fixed top-0 left-0 z-50 flex justify-center w-full">
        <div className="flex p-5">
          <button
            type="button"
            className={cm(
              'inline-block px-4 pt-2 pb-1.5 font-bold shadow bg-stone-200 border-b-[3px] border-stone-200',
              !guided && 'border-orange-500 bg-stone-100'
            )}
            onClick={() => setGuided(false)}
            disabled={isNotNil(stop) || playing}
          >
            {t('modes.free')}
          </button>
          <button
            type="button"
            className={cm(
              'inline-block px-4 pt-2 pb-1.5 font-bold shadow bg-stone-200 border-b-[3px] border-stone-200',
              guided && 'border-orange-500 bg-stone-100'
            )}
            onClick={() => setGuided(true)}
            disabled
          >
            {t('modes.guided')}
          </button>
        </div>
        {/* <Tour onSelect={handleSelectRoute} disabled={playing || !guided} /> */}
      </div>
      <div className="fixed inset-0">
        <Map
          route={isNotNil(currentRoute) ? routes[currentRoute] : undefined}
          onClick={guided ? identity : setLocation}
          onAnimationComplete={handleAnimationComplete}
          guided={guided}
        />
      </div>
      <AnimatePresence>
        {isNotNil(location) && (
          <Chat
            location={location.name}
            elevation={location.elevation}
            coordinates={location.coordinates}
          />
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;
