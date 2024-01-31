// inspired by https://github.com/mapbox/impact-tools/tree/master

import type { MapRef } from 'react-map-gl';
import { MercatorCoordinate } from 'mapbox-gl';

import { computeCameraPosition } from './util.js';

const rotate = ({
  map,
  lngLat,
  altitude,
  speed,
}: {
  map: MapRef;
  lngLat: {
    lng: number;
    lat: number;
  };
  altitude: number;
  speed: number;
}) => {
  let start: number;
  let stop = false;

  let currentBearing;
  let currentPitch;

  // the animation frame will run as many times as necessary until the duration has been reached
  const frame = async (time: number) => {
    if (!start) {
      start = time;
    }

    // otherwise, use the current time to determine how far along in the duration we are
    let animationPhase = (time - start) / 5000;

    // because the phase calculation is imprecise, the final zoom can vary
    // if it ended up greater than 1, set it to 1 so that we get the exact endAltitude that was requested
    if (animationPhase > 1) {
      animationPhase = 1;
    }

    // rotate the camera between startBearing and endBearing
    currentBearing = map.getBearing() + speed;

    const pitch = map.getPitch();
    currentPitch = pitch < 50 ? 50 : pitch - speed;

    // compute corrected camera ground position, so the start of the path is always in view
    const correctedPosition = computeCameraPosition(
      currentPitch,
      currentBearing,
      lngLat,
      altitude
    );

    // set the pitch and bearing of the camera
    const camera = map.getFreeCameraOptions();
    camera.setPitchBearing(currentPitch, currentBearing);

    // set the position and altitude of the camera
    camera.position = MercatorCoordinate.fromLngLat(
      correctedPosition,
      altitude
    );

    // apply the new camera options
    map.setFreeCameraOptions(camera);

    if (!stop) await window.requestAnimationFrame(frame);
  };

  if (!stop) window.requestAnimationFrame(frame);

  return () => {
    stop = true;
  };
};

export default rotate;
