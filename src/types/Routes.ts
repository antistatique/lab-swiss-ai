import { FeatureCollection, LineString } from 'geojson';

export type Tour = {
  title: string;
  subtitle: string;
  thumbnail: string;
  routes: Record<string, Route>;
};

export type Route = {
  paths: FeatureCollection<LineString>;
  speed: number;
  location: string;
  title: string;
  subtitle: string;
  thumbnail: string;
};
