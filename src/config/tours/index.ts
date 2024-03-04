import { FeatureCollection, LineString } from 'geojson';

import step1 from '@/config/tours/step1.json';
import step2 from '@/config/tours/step2.json';
import step3 from '@/config/tours/step3.json';
import { Tour } from '@/types/Routes';

const tours: Record<string, Tour> = {
  valais: {
    title: 'Tour du Valais',
    subtitle: 'A tour of the Valais region',
    thumbnail:
      'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
    routes: {
      step1: {
        paths: step1 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Engadine valley, Switzerland',
        title: 'Engadine valley',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
      step2: {
        paths: step2 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Piz Bernina, Switzerland',
        title: 'Piz Bernina',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
      step3: {
        paths: step3 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Lac Lagh da Saoseo, Poschiavo, Switerland',
        title: 'Lac Lagh da Saoseo titre montre long et wrappable',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
    },
  },
  jura: {
    title: 'Tour du Jura',
    subtitle: 'A tour of the Valais region',
    thumbnail:
      'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
    routes: {
      route1: {
        paths: step1 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Engadine valley, Switzerland',
        title: 'Engadine valley',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
      route2: {
        paths: step2 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Piz Bernina, Switzerland',
        title: 'Piz Bernina',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
    },
  },
};

export default tours;

export const completeTour = () => {
  let previous = '';

  const routes = Object.keys(tours).reduce(
    (acc: Record<string, string>, tour: string) => {
      Object.keys(tours[tour].routes).forEach(route => {
        if (previous === '') {
          previous = `${tour}.${route}`;
          acc.start = `${tour}.${route}`;
        } else {
          acc[previous as string] = `${tour}.${route}`;
          previous = `${tour}.${route}`;
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
