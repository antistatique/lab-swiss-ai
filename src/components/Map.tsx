import React, { useCallback, useEffect, useRef, useState } from 'react';
import MapGl, { Layer, MapRef, Source } from 'react-map-gl';
import { isNotNil } from 'ramda';

import { Location } from '@/types/Location';
import type { RouteFeature } from '@/types/Routes';
import around from '@/utils/around';
import playAnimations from '@/utils/mb/play-animations';

import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  route?: RouteFeature;
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
  const [labelId, setLabelId] = useState<string | null>(null);
  const [currentMarker, setCurrentMarker] = useState<[number, number] | null>(
    null
  );
  const mapRef = useRef<MapRef | null>(null);
  const [cursor, setCursor] = useState('auto');

  const startAnimation = async () => {
    if (mapRef.current !== null && isNotNil(route)) {
      await playAnimations(
        mapRef.current,
        route,
        route.properties.speed,
        route.properties.rotation
      );
      const stop = around(mapRef.current, 0.1);
      onAnimationComplete(stop);
    }
  };

  const onMapLoad = useCallback(() => {
    const layers = mapRef.current?.getStyle().layers;
    if (isNotNil(layers)) {
      for (const layer of layers) {
        if (layer.type === 'symbol') {
          setLabelId(layer.id);
          break;
        }
      }
    }

    mapRef.current?.loadImage(`/images/marker.png`, (error, image) => {
      if (error) throw error;
      if (!mapRef.current?.hasImage('marker') && isNotNil(image)) {
        mapRef.current?.addImage('marker', image);
      }
    });
  }, []);

  useEffect(() => {
    if (isNotNil(route)) {
      startAnimation();
      setCurrentMarker(route.geometry.coordinates.at(-1) as [number, number]);
    } else {
      setCurrentMarker(null);
    }
  }, [route]);

  const handleClick = (e: mapboxgl.MapLayerMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point);

    const name = features?.[0]?.properties?.name;
    const geometry = features?.[0]?.geometry;
    const lngLat = geometry?.type === 'Point' ? geometry?.coordinates : [0, 0];
    const elevation =
      features?.[0]?.properties?.ele ??
      mapRef.current?.queryTerrainElevation({
        lng: lngLat[0],
        lat: lngLat[1],
      }) ??
      0;

    if (isNotNil(name)) {
      onClick({
        name,
        original: name,
        coordinates: {
          lng: lngLat[0],
          lat: lngLat[1],
        },
        elevation: Math.round(elevation),
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
      onLoad={onMapLoad}
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
      {isNotNil(currentMarker) && (
        <Source
          id="marker-data"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  coordinates: currentMarker,
                  type: 'Point',
                },
              },
            ],
          }}
        >
          <Layer
            beforeId={labelId ?? ''}
            {...{
              id: 'marker-point',
              type: 'symbol',
              source: 'marker-data',
              layout: {
                'icon-image': 'marker',
                'icon-size': 0.5,
                'icon-padding': 0,
                'icon-anchor': 'bottom',
                'icon-allow-overlap': true,
                'icon-ignore-placement': true,
              },
            }}
          />
        </Source>
      )}
    </MapGl>
  );
};

export default Map;
