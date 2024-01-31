import { FeatureCollection, LineString } from 'geojson';

export type RouteName = 'step1' | 'step2' | 'step3';

export type Route = {
  paths: FeatureCollection<LineString>;
  speed: number;
};
