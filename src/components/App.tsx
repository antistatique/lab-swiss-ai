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
import tours, { completeTour } from '@/config/tours';
import useImages from '@/hooks/useImages';
import type { Location } from '@/types/Location';

import '@/locales/i18n';

const queryClient = new QueryClient();

const App = () => {
  const [infoOpen, setInfoOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentTour, setCurrentTour] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>();
  const [playing, setPlaying] = useState(false);
  const [stop, setStop] = useState<(() => void) | null>();
  const [guided, setGuided] = useState(true);

  const { setQuery, images } = useImages();

  const handleStop = () => {
    if (isNotNil(stop)) {
      stop();
      setStop(null);
    }
  };

  const handleAnimationComplete = (s: () => void) => {
    if (isNotNil(currentTour) && isNotNil(currentRoute)) {
      setPlaying(false);
      setStop(() => s);

      setLocation({
        name: tours[currentTour].routes[currentRoute].location,
        coordinates: {
          lng: 6.5,
          lat: 46.5,
        },
        elevation: 1500,
      });
    }
  };

  const handleSelectRoute = (tour: string, route: string) => {
    setCurrentTour(tour);
    setCurrentRoute(route);
    setPlaying(true);
    handleStop();
  };

  const handleNextRoute = () => {
    const nextRoute = completeTour()[`${currentTour}.${currentRoute}`];
    const [tour, route] = nextRoute.split('.');
    setCurrentTour(tour);
    setCurrentRoute(route);
    setPlaying(true);
    handleStop();
  };

  const handleStart = () => {
    if (!started) {
      setStarted(true);
      setTimeout(() => {
        const { start } = completeTour();
        const [tour, route] = start.split('.');
        setCurrentTour(tour);
        setCurrentRoute(route);
        setPlaying(true);
      }, 400);
    }
  };

  useEffect(() => {
    setLocation(null);
    if (!guided) handleStop();
    if (guided) {
      const { start } = completeTour();
      const [tour] = start.split('.');
      setCurrentTour(tour);
    }
  }, [guided]);

  useEffect(() => {
    if (isNotNil(location)) {
      setQuery(location.name);
    }
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        {infoOpen && (
          <GetStarted
            started={started}
            onStart={() => {
              handleStart();
              setInfoOpen(false);
            }}
          />
        )}
      </AnimatePresence>
      {isNotNil(currentTour) && (
        <Tour
          currentTour={currentTour}
          currentRoute={currentRoute}
          onSelect={handleSelectRoute}
          disabled={playing || !guided}
        />
      )}
      <Controls
        guided={guided}
        setGuided={setGuided}
        setInfoOpen={setInfoOpen}
        playing={playing}
      />
      <div className="fixed inset-0">
        <Map
          route={
            isNotNil(currentTour) && isNotNil(currentRoute)
              ? tours[currentTour].routes[currentRoute]
              : undefined
          }
          onClick={guided ? identity : setLocation}
          onAnimationComplete={handleAnimationComplete}
          guided={guided}
        />
      </div>
      <AnimatePresence>
        {isNotNil(currentTour) && isNotNil(currentRoute) && playing && (
          <Progress
            speed={tours[currentTour].routes[currentRoute].speed}
            location={tours[currentTour].routes[currentRoute].title}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isNotNil(location) && !playing && (
          <Chat
            location={location.name}
            elevation={location.elevation}
            coordinates={location.coordinates}
            onContinue={guided ? handleNextRoute : undefined}
            images={images}
          />
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
};

export default App;
