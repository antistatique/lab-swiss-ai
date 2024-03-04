import { FeatureCollection, LineString } from 'geojson';

export type RouteName = 'step1' | 'step2' | 'step3';

export type Tour = {
  title: string;
  subtitle: string;
  thumbnail: string;
  routes: Route[];
};

export type Route = {
  paths: FeatureCollection<LineString>;
  speed: number;
  location: string;
  title: string;
  subtitle: string;
  thumbnail: string;
};
