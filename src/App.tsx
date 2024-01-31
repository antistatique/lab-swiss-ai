import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { identity, isNotNil } from 'ramda';

import Chat from '@/components/Chat';
import Map from '@/components/Map';
import Tour from '@/components/Tour';
import routes from '@/config/routes';
import useChatGpt from '@/hooks/useChatGpt';
import { getLocations } from '@/hooks/useLocation';
import { RouteName } from '@/types/Routes';
import placeFromLocations from '@/utils/placeFromLocations';

const queryClient = new QueryClient();

const App = () => {
  const [currentRoute, setCurrentRoute] = useState<RouteName | null>(null);
  const [thinking, setThinking] = useState(false);
  const [guided, setGuided] = useState(true);
  const { messages, start, ask, error } = useChatGpt();

  const handleClick = async (e: mapboxgl.MapLayerMouseEvent) => {
    setThinking(true);
    const {
      lngLat: { lng, lat },
    } = e;
    const locations = await getLocations(lng, lat);
    const place = placeFromLocations(locations);
    await start(
      JSON.stringify({
        zipCityCantonCountry: place,
        coordinates: { lng, lat },
      })
    );
  };

  useEffect(() => {
    if (messages.length > 0) {
      setThinking(false);
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      setThinking(false);
    }
  }, [error]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed top-0 left-0 z-50 flex">
        <div className="p-4">
          <button
            type="button"
            className="inline-block px-4 py-2 text-sm text-left text-gray-700 bg-white rounded-md hover:bg-gray-100"
            onClick={() => setGuided(i => !i)}
          >
            {guided ? '' : 'Not'} Guided
          </button>
        </div>
        <Tour onSelect={setCurrentRoute} />
      </div>
      <div className="flex">
        <div className="sticky top-0 w-3/4">
          <Map
            route={isNotNil(currentRoute) ? routes[currentRoute] : undefined}
            onClick={guided ? identity : handleClick}
          />
        </div>
        <div className="w-1/4 h-screen overflow-y-auto">
          <Chat messages={messages} onSend={ask} thinking={thinking} />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
