import React, { useState } from 'react';
import { FeatureCollection, LineString } from 'geojson';

import Map from '@/components/Map';
import zermatt from '@/config/routes/zermatt-mini.json';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <Map
        isPlaying={isPlaying}
        route={zermatt as unknown as FeatureCollection<LineString>}
      />
      <div className="fixed top-0 left-0 flex m-4 gap-4">
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
    </div>
  );
};

export default App;
