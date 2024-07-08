import { FeatureCollection, LineString } from 'geojson';

import bern from '@/config/tours/bern.json';
import grischun from '@/config/tours/grischun.json';
import lausanne from '@/config/tours/lausanne.json';
import ticino from '@/config/tours/ticino.json';
import valais from '@/config/tours/valais.json';
import vully from '@/config/tours/vully.json';
import zurich from '@/config/tours/zurich.json';
import { Route, Tour } from '@/types/Routes';

const tours: Record<string, Tour> = {
  lausanne: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vall%C3%A9e_du_Rh%C3%B4ne.jpg/640px-Vall%C3%A9e_du_Rh%C3%B4ne.jpg',
    routes: lausanne as FeatureCollection<LineString, Route>,
  },
  valais: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/6/65/Matterhorn-EastAndNorthside-viewedFromZermatt_landscapeformat-2.jpg',
    routes: valais as FeatureCollection<LineString, Route>,
  },
  bern: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/7/78/Lauterbrunnen%2C_Bernese_Oberland.jpg',
    routes: bern as FeatureCollection<LineString, Route>,
  },
  ticino: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Valle_Verzasca%2C_Ticino%2C_Switzerland12.jpg',
    routes: ticino as FeatureCollection<LineString, Route>,
  },
  grischun: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Sankt_Moritz_Lake_Piz_Muragl.jpg/2560px-Sankt_Moritz_Lake_Piz_Muragl.jpg',
    routes: grischun as FeatureCollection<LineString, Route>,
  },
  zurich: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Saint-Ursanne%2C_le_pont_Saint-Jean_sur_le_Doubs.jpg/2560px-Saint-Ursanne%2C_le_pont_Saint-Jean_sur_le_Doubs.jpg',
    routes: zurich as FeatureCollection<LineString, Route>,
  },
  vully: {
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/SwissWineRegionVaud.jpg/2560px-SwissWineRegionVaud.jpg',
    routes: vully as FeatureCollection<LineString, Route>,
  },
};

export default tours;

export const completeTour = () => {
  let previous = '';

  const routes = Object.keys(tours).reduce(
    (acc: Record<string, string>, tour: string) => {
      tours[tour].routes.features.forEach(route => {
        if (previous === '') {
          previous = `${tour}.${route.properties.slug}`;
          acc.start = `${tour}.${route.properties.slug}`;
        } else {
          acc[previous as string] = `${tour}.${route.properties.slug}`;
          previous = `${tour}.${route.properties.slug}`;
        }
      });

      return acc;
    },
    {}
  );

  return {
    ...routes,
    [previous]: routes.start,
  };
};
