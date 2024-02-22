'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { identity, isNil, isNotNil } from 'ramda';

import Chat from '@/components/Chat';
import GetStarted from '@/components/GetStarted';
import Map from '@/components/Map';
import Tour from '@/components/Tour';
import routes from '@/config/routes';
import { RouteName } from '@/types/Routes';

const queryClient = new QueryClient();

const App = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteName | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [stop, setStop] = useState<(() => void) | null>();
  const [guided, setGuided] = useState(false);

  const handleStop = () => {
    if (isNotNil(stop)) {
      stop();
      setStop(null);
    }
  };

  const handleAnimationComplete = (s: () => void) => {
    if (isNotNil(currentRoute)) {
      setPlaying(false);
      setStop(() => s);

      setLocation(
        JSON.stringify({
          placeName: routes[currentRoute].location,
        })
      );
    }
  };

  const handleSelectRoute = (route: RouteName) => {
    setCurrentRoute(route);
    setPlaying(true);
    if (isNotNil(stop)) {
      stop();
      setStop(null);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GetStarted />
      <div className="fixed top-0 left-0 z-50 flex">
        <div className="flex p-4 gap-2">
          <button
            type="button"
            className="inline-block px-4 py-2 text-sm text-left text-gray-700 bg-white rounded-md hover:bg-gray-100 disabled:bg-gray-500"
            onClick={() => setGuided(i => !i)}
            disabled={isNotNil(stop) || playing}
          >
            {guided ? 'Not' : ''} Guided
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2 text-sm text-left text-gray-700 bg-white rounded-md hover:bg-gray-100 disabled:bg-gray-500"
            onClick={handleStop}
            disabled={playing || !guided || isNil(currentRoute)}
          >
            Stop
          </button>
        </div>
        <Tour onSelect={handleSelectRoute} disabled={playing || !guided} />
      </div>
      <div className="flex">
        <div className="sticky top-0 w-3/4">
          <Map
            route={isNotNil(currentRoute) ? routes[currentRoute] : undefined}
            onClick={guided ? identity : setLocation}
            onAnimationComplete={handleAnimationComplete}
            guided={guided}
          />
        </div>
        <div className="w-1/4 h-screen overflow-y-auto">
          <Chat location={location} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
