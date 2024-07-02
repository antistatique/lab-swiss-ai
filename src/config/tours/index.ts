import { FeatureCollection, LineString } from 'geojson';

import lausanneValais from '@/config/tours/lausanne-valais.json';
import { Route, Tour } from '@/types/Routes';

const tours: Record<string, Tour> = {
  'lausanne-valais': {
    title: '#1 Lausanne to Valais',
    subtitle: 'Enter the swiss Alps',
    thumbnail:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vall%C3%A9e_du_Rh%C3%B4ne.jpg/640px-Vall%C3%A9e_du_Rh%C3%B4ne.jpg',
    routes: lausanneValais as FeatureCollection<LineString, Route>,
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
