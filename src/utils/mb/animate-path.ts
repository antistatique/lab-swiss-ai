// inspired by https://github.com/mapbox/impact-tools/tree/master

import type { MapRef } from 'react-map-gl';
import { along, lineDistance } from '@turf/turf';
import { Feature, LineString } from 'geojson';
import { MercatorCoordinate } from 'mapbox-gl';

import { computeCameraPosition } from './util';

const animatePath = async ({
  map,
  duration,
  rotation = -150,
  path,
  startBearing,
  startAltitude,
  pitch,
}: {
  map: MapRef;
  duration: number;
  rotation?: number;
  path: Feature<LineString>;
  startBearing: number;
  startAltitude: number;
  pitch: number;
}) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise<void>(async resolve => {
    const pathDistance = lineDistance(path);
    let startTime: number;

    const frame = async (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const animationPhase = (currentTime - startTime) / duration;

      // when the duration is complete, resolve the promise and stop iterating
      if (animationPhase > 1) {
        resolve();
        return;
      }

      // calculate the distance along the path based on the animationPhase
      const alongPath = along(path, pathDistance * animationPhase).geometry
        .coordinates;

      const lngLat = {
        lng: alongPath[0],
        lat: alongPath[1],
      };

      // slowly rotate the map at a constant rate
      const bearing = startBearing - animationPhase * rotation;

      // Variant to get the bearing from the current point to the next point
      // Play with the 0.XX to get the right amount of rotation
      // const nextPath = along(path, pathDistance * (animationPhase + 0.2))
      //   .geometry.coordinates;
      // const bearing = getBearing(alongPath, nextPath);

      // compute corrected camera ground position, so that he leading edge of the path is in view
      const correctedPosition = computeCameraPosition(
        pitch,
        bearing,
        lngLat,
        startAltitude,
        true // smooth
      );

      // set the pitch and bearing of the camera
      const camera = map.getFreeCameraOptions();
      camera.setPitchBearing(pitch, bearing);

      // set the position and altitude of the camera
      camera.position = MercatorCoordinate.fromLngLat(
        correctedPosition,
        startAltitude
      );

      // apply the new camera options
      map.setFreeCameraOptions(camera);

      // repeat!
      await window.requestAnimationFrame(frame);
    };

    await window.requestAnimationFrame(frame);
  });

export default animatePath;
