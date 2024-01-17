import type { MapRef } from 'react-map-gl';
import { along, lineDistance, lineString } from '@turf/turf';
import type { FeatureCollection, LineString } from 'geojson';
import { MercatorCoordinate } from 'mapbox-gl';

const follow = (
  routes: FeatureCollection<LineString>,
  map: MapRef,
  animationDuration = 20000
) =>
  new Promise<void>(resolve => {
    const targetRoute = routes.features[0].geometry.coordinates;
    const cameraRoute = routes.features[1].geometry.coordinates;

    const cameraAltitude = 2000;
    // get the overall distance of each route so we can interpolate along them
    const routeDistance = lineDistance(lineString(targetRoute));
    const cameraRouteDistance = lineDistance(lineString(cameraRoute));

    let start = 0;

    const timer = setInterval(() => {
      const time = performance.now();
      if (!start) start = time;
      const phase = (time - start) / animationDuration;

      if (phase > 1) {
        clearInterval(timer);
        resolve();
        return;
      }

      const alongRoute = along(lineString(targetRoute), routeDistance * phase)
        .geometry.coordinates;

      const alongCamera = along(
        lineString(cameraRoute),
        cameraRouteDistance * phase
      ).geometry.coordinates;

      const camera = map.getFreeCameraOptions();

      // set the position and altitude of the camera
      camera.position = MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera[0],
          lat: alongCamera[1],
        },
        cameraAltitude
      );

      camera.lookAtPoint({
        lng: alongRoute[0],
        lat: alongRoute[1],
      });

      map.setFreeCameraOptions(camera);
    }, 10);
  });

export default follow;
