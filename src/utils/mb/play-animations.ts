// inspired by https://github.com/mapbox/impact-tools/tree/master

import { MapRef } from 'react-map-gl';
import { bearing as getBearing } from '@turf/turf';
import { Feature, LineString } from 'geojson';

import animatePath from './animate-path';
import flyInAndRotate from './fly-in-and-rotate';

const playAnimations = async (
  map: MapRef,
  path: Feature<LineString>,
  speed: number,
  rotation?: number
) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<void>(async resolve => {
    // get the start of the linestring, to be used for animating a zoom-in from high altitude
    const targetLngLat = {
      lng: path.geometry.coordinates[0][0],
      lat: path.geometry.coordinates[0][1],
    };

    // animate zooming in to the start point, get the final bearing and altitude for use in the next animation
    const { bearing, altitude } = await flyInAndRotate({
      map,
      targetLngLat,
      duration: 1000,
      // duration: 100,
      startAltitude: 10000,
      endAltitude: 2000,
      startBearing: 0,
      endBearing: getBearing(
        path.geometry.coordinates[0],
        path.geometry.coordinates[1]
      ),
      startPitch: 20,
      endPitch: 65,
    });

    // follow the path while slowly rotating the camera, passing in the camera bearing and altitude from the previous animation
    await animatePath({
      map,
      duration: speed,
      rotation,
      path,
      startBearing: bearing,
      startAltitude: altitude,
      pitch: 65,
    });

    // get the bounds of the linestring, use fitBounds() to animate to a final view
    // const bounds = bbox(path);
    // map.fitBounds(bounds as LngLatBoundsLike, {
    //   duration: 3000,
    //   pitch: 30,
    //   bearing: 0,
    //   padding: 120,
    // });

    // setTimeout(() => {
    resolve();
    // }, 10000);
  });

export default playAnimations;
