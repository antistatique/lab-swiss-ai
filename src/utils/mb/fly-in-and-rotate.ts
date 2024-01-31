// inspired by https://github.com/mapbox/impact-tools/tree/master

import type { MapRef } from 'react-map-gl';
import { easeCubicOut } from 'd3-ease';
import { MercatorCoordinate } from 'mapbox-gl';

import { computeCameraPosition } from './util.js';

const flyInAndRotate = async ({
  map,
  targetLngLat,
  duration,
  startAltitude,
  endAltitude,
  startBearing,
  endBearing,
  startPitch,
  endPitch,
}: {
  map: MapRef;
  targetLngLat: {
    lng: number;
    lat: number;
  };
  duration: number;
  startAltitude: number;
  endAltitude: number;
  startBearing: number;
  endBearing: number;
  startPitch: number;
  endPitch: number;
}) =>
  new Promise<{
    bearing: number;
    altitude: number;
    // eslint-disable-next-line no-async-promise-executor
  }>(async resolve => {
    let start: number;

    let currentAltitude;
    let currentBearing;
    let currentPitch;

    // the animation frame will run as many times as necessary until the duration has been reached
    const frame = async (time: number) => {
      if (!start) {
        start = time;
      }

      // otherwise, use the current time to determine how far along in the duration we are
      let animationPhase = (time - start) / duration;

      // because the phase calculation is imprecise, the final zoom can vary
      // if it ended up greater than 1, set it to 1 so that we get the exact endAltitude that was requested
      if (animationPhase > 1) {
        animationPhase = 1;
      }

      currentAltitude =
        startAltitude +
        (endAltitude - startAltitude) * easeCubicOut(animationPhase);
      // rotate the camera between startBearing and endBearing
      currentBearing =
        startBearing +
        (endBearing - startBearing) * easeCubicOut(animationPhase);

      currentPitch =
        startPitch + (endPitch - startPitch) * easeCubicOut(animationPhase);

      // compute corrected camera ground position, so the start of the path is always in view
      const correctedPosition = computeCameraPosition(
        currentPitch,
        currentBearing,
        targetLngLat,
        currentAltitude
      );

      // set the pitch and bearing of the camera
      const camera = map.getFreeCameraOptions();
      camera.setPitchBearing(currentPitch, currentBearing);

      // set the position and altitude of the camera
      camera.position = MercatorCoordinate.fromLngLat(
        correctedPosition,
        currentAltitude
      );

      // apply the new camera options
      map.setFreeCameraOptions(camera);

      // when the animationPhase is done, resolve the promise so the parent function can move on to the next step in the sequence
      if (animationPhase === 1) {
        resolve({
          bearing: currentBearing,
          altitude: currentAltitude,
        });

        // return so there are no further iterations of this frame
        return;
      }

      await window.requestAnimationFrame(frame);
    };

    await window.requestAnimationFrame(frame);
  });

export default flyInAndRotate;
