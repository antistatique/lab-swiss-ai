import type { MapRef } from 'react-map-gl';

const around = (map: MapRef, speed = 0.5): (() => void) => {
  const rotateCamera = () => {
    const pitch = map.getPitch();
    map.easeTo({
      pitch: pitch < 50 ? 50 : pitch - speed,
      bearing: map.getBearing() + speed,
      duration: 16,
    });
  };
  const rotation = setInterval(rotateCamera, 16);

  return () => {
    clearInterval(rotation);
  };
};

export default around;
