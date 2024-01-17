import React from 'react';
import MapGl, { Source } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => (
  <MapGl
    mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    initialViewState={{
      longitude: 7.514804113009831,
      latitude: 46.07963874912346,
      zoom: 14,
      pitch: 81,
      bearing: -53,
    }}
    style={{ width: '100vw', height: '100vh' }}
    terrain={{ source: 'mapbox-dem', exaggeration: 1 }}
    mapStyle="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json"
  >
    <Source
      id="mapbox-dem"
      type="raster-dem"
      url="mapbox://mapbox.mapbox-terrain-dem-v1"
      // url="https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=5Wtk0gcm4Esb8i5EEksQ"
      tileSize={512}
      maxzoom={14}
    />
  </MapGl>
);

export default Map;
