import React, { useEffect, useRef, useState } from 'react';
import MapGl, { MapRef, Source } from 'react-map-gl';
import { isNotNil } from 'ramda';

import { Location } from '@/types/Location';
import { Route } from '@/types/Routes';
import around from '@/utils/around';
import playAnimations from '@/utils/mb/play-animations';

import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  route?: Route;
  onClick: (location: Location) => void;
  onAnimationComplete: (stop: () => void) => void;
  guided: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let throttleTimer: any = null;

const Map = ({
  route,
  onClick,
  onAnimationComplete,
  guided,
}: Props): JSX.Element => {
  const mapRef = useRef<MapRef | null>(null);
  const [cursor, setCursor] = useState('auto');

  const startAnimation = async () => {
    if (mapRef.current !== null && isNotNil(route)) {
      await playAnimations(
        mapRef.current,
        route.paths.features[0],
        route.speed
      );
      const stop = around(mapRef.current, 0.1);
      onAnimationComplete(stop);
    }
  };

  useEffect(() => {
    if (isNotNil(route)) startAnimation();
  }, [route]);

  const handleClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point);

    const name = features?.[0]?.properties?.name;
    const geometry = features?.[0]?.geometry;
    const lngLat = geometry?.type === 'Point' ? geometry?.coordinates : [0, 0];
    const elevation =
      mapRef.current?.queryTerrainElevation({
        lng: lngLat[0],
        lat: lngLat[1],
      }) ?? 0;

    if (isNotNil(name)) {
      onClick({
        name,
        coordinates: {
          lng: lngLat[0],
          lat: lngLat[1],
        },
        elevation,
      });
    }
  };

  const onMouseMove = (e: mapboxgl.MapLayerMouseEvent) => {
    if (!guided) {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          throttleTimer = null; // once the timeout function executes, reset the timer
          const features = mapRef.current?.queryRenderedFeatures(e.point);
          const hasName = isNotNil(features?.[0]?.properties?.name);
          setCursor(hasName ? 'pointer' : 'auto');
        }, 20);
      }
    }
  };

  return (
    <MapGl
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: 7.514804113009831,
        latitude: 46.07963874912346,
        zoom: 14,
        pitch: 81,
        bearing: -53,
      }}
      fog={{
        range: [0.8, 8],
        color: '#D8D8D8',
        'horizon-blend': 0.5,
        'high-color': '#245bde',
        'space-color': '#000000',
        'star-intensity': 0.15,
      }}
      style={{ position: 'absolute', inset: 0 }}
      terrain={{ source: 'mapbox-dem', exaggeration: 1 }}
      mapStyle="https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json"
      maxBounds={[
        [5.272288963213526, 45.38694371415983],
        [11.40758367952867, 48.228588627435585],
      ]}
      localFontFamily="Space Grotesk"
      onClick={handleClick}
      onMouseMove={onMouseMove}
      cursor={cursor}
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
};

export default Map;
