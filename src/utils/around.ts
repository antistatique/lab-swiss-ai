import type { MapRef } from 'react-map-gl';

const around = (map: MapRef, speed = 0.5): (() => void) => {
  const rotateCamera = () => {
    map.easeTo({
      pitch: 65,
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
