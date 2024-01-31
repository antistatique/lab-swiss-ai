import { FeatureCollection, LineString } from 'geojson';

import step1 from '@/config/routes/step1.json';
import step2 from '@/config/routes/step2.json';
import step3 from '@/config/routes/step3.json';
import { Route, RouteName } from '@/types/Routes';

const routes: Record<RouteName, Route> = {
  step1: {
    paths: step1 as FeatureCollection<LineString>,
    speed: 20_000,
    location: 'Engadine valley, Switzerland',
    name: '📍',
  },
  step2: {
    paths: step2 as FeatureCollection<LineString>,
    speed: 20_000,
    location: 'Piz Bernina, Switzerland',
    name: '🏔️',
  },
  step3: {
    paths: step3 as FeatureCollection<LineString>,
    speed: 20_000,
    location: 'Lac Lagh da Saoseo, Poschiavo, Switerland',
    name: '🚣‍♂️',
  },
};

export default routes;
