import { FeatureCollection, LineString } from 'geojson';

import step1 from '@/config/tours/step1.json';
import step2 from '@/config/tours/step2.json';
import step3 from '@/config/tours/step3.json';
import { Tour } from '@/types/Routes';

const tours: [Tour] = [
  {
    title: 'Tour du Valais',
    subtitle: 'A tour of the Valais region',
    thumbnail:
      'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
    routes: [
      {
        paths: step1 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Engadine valley, Switzerland',
        title: 'Engadine valley',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
      {
        paths: step2 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Piz Bernina, Switzerland',
        title: 'Piz Bernina',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
      {
        paths: step3 as FeatureCollection<LineString>,
        speed: 20_000,
        location: 'Lac Lagh da Saoseo, Poschiavo, Switerland',
        title: 'Lac Lagh da Saoseo titre montre long et wrappable',
        subtitle: "Sommet à 4'048m",
        thumbnail:
          'https://images.unsplash.com/photo-1708852154434-d6436655b99d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
    ],
  },
];

export default tours;
