import type { MapRef } from 'react-map-gl';

const around = (map: MapRef, speed = 0.5): (() => void) => {
  const rotateCamera = () => {
    console.log('rotation');
    map.easeTo({
      pitch: 50,
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
