import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeatureCollection, LineString } from 'geojson';

import Chat from '@/components/Chat';
import Map from '@/components/Map';
import zermatt from '@/config/routes/zermatt-mini.json';
import useChatGpt from '@/hooks/useChatGpt';
import { getLocations } from '@/hooks/useLocation';
import placeFromLocations from '@/utils/placeFromLocations';

const queryClient = new QueryClient();

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thinking, setThinking] = useState(false);
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
      <div className="flex">
        <div className="sticky top-0 w-3/4">
          <Map
            isPlaying={isPlaying}
            route={zermatt as unknown as FeatureCollection<LineString>}
            onClick={handleClick}
          />
        </div>
        <div className="w-1/4 h-screen overflow-y-auto">
          <Chat messages={messages} onSend={ask} thinking={thinking} />
        </div>
      </div>
      <div className="fixed top-0 left-0 flex m-4 gap-4 font-['Space_Grotesk']">
        <button
          type="button"
          className="p-3 bg-green-100"
          onClick={() => setIsPlaying(true)}
        >
          Start
        </button>
        <button
          type="button"
          className="p-3 bg-red-100"
          onClick={() => setIsPlaying(false)}
        >
          Stop
        </button>
      </div>
    </QueryClientProvider>
  );
};

export default App;
