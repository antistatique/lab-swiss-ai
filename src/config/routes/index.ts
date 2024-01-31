import { FeatureCollection, LineString } from 'geojson';

import step1 from '@/config/routes/step1.json';
import step2 from '@/config/routes/step2.json';
import step3 from '@/config/routes/step3.json';
import { Route, RouteName } from '@/types/Routes';

const routes: Record<RouteName, Route> = {
  step1: { paths: step1 as FeatureCollection<LineString>, speed: 10_000 },
  step2: { paths: step2 as FeatureCollection<LineString>, speed: 20_000 },
  step3: { paths: step3 as FeatureCollection<LineString>, speed: 40_000 },
};

export default routes;
