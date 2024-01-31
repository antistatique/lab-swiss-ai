// given a bearing, pitch, altitude, and a targetPosition on the ground to look at,

// calculate the camera's targetPosition as lngLat
let previousCameraPosition: {
  lng: number;
  lat: number;
};

// amazingly simple, via https://codepen.io/ma77os/pen/OJPVrP
function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

const computeCameraPosition = (
  pitch: number,
  bearing: number,
  targetPosition: {
    lng: number;
    lat: number;
  },
  altitude: number,
  smooth = false
) => {
  const bearingInRadian = bearing / 57.29;
  const pitchInRadian = (90 - pitch) / 57.29;

  const lngDiff =
    ((altitude / Math.tan(pitchInRadian)) * Math.sin(-bearingInRadian)) / 70000; // ~70km/degree longitude
  const latDiff =
    ((altitude / Math.tan(pitchInRadian)) * Math.cos(-bearingInRadian)) /
    110000; // 110km/degree latitude

  const correctedLng = targetPosition.lng + lngDiff;
  const correctedLat = targetPosition.lat - latDiff;

  const newCameraPosition = {
    lng: correctedLng,
    lat: correctedLat,
  };

  if (smooth) {
    if (previousCameraPosition) {
      const SMOOTH_FACTOR = 0.95;
      newCameraPosition.lng = lerp(
        newCameraPosition.lng,
        previousCameraPosition.lng,
        SMOOTH_FACTOR
      );
      newCameraPosition.lat = lerp(
        newCameraPosition.lat,
        previousCameraPosition.lat,
        SMOOTH_FACTOR
      );
    }
  }

  previousCameraPosition = newCameraPosition;

  return newCameraPosition;
};

export { computeCameraPosition };
