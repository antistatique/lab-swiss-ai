'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { identity, isNotNil } from 'ramda';

import Chat from '@/components/Chat';
import Controls from '@/components/Controls';
import GetStarted from '@/components/GetStarted';
import Map from '@/components/Map';
import Progress from '@/components/Progress';
import Tour from '@/components/Tour';
import type { Location } from '@/types/Location';
import { Route } from '@/types/Routes';

import '@/locales/i18n';

const queryClient = new QueryClient();

const App = () => {
  const [started, setStarted] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [location, setLocation] = useState<Location | null>();
  const [playing, setPlaying] = useState(false);
  const [stop, setStop] = useState<(() => void) | null>();
  const [guided, setGuided] = useState(true);

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
        name: currentRoute.location,
        coordinates: {
          lng: 6.5,
          lat: 46.5,
        },
        elevation: 1500,
      });
    }
  };

  const handleSelectRoute = (route: Route) => {
    setCurrentRoute(route);
    setPlaying(true);
    if (isNotNil(stop)) {
      stop();
      setStop(null);
    }
  };

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        // handleSelectRoute('step1');
      }, 400);
    }
  }, [started]);

  useEffect(() => {
    if (!guided && isNotNil(stop)) {
      stop();
    }
  }, [guided]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {!started && <GetStarted onStart={() => setStarted(true)} />}
      </AnimatePresence>
      <Tour onSelect={handleSelectRoute} disabled={playing || !guided} />
      <Controls guided={guided} setGuided={setGuided} playing={playing} />
      <div className="fixed inset-0">
        <Map
          route={currentRoute ?? undefined}
          onClick={guided ? identity : setLocation}
          onAnimationComplete={handleAnimationComplete}
          guided={guided}
        />
      </div>
      <AnimatePresence>
        {isNotNil(currentRoute) && playing && (
          <Progress speed={currentRoute.speed} location={currentRoute.title} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNotNil(location) && !playing && (
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
