import { Feature, FeatureCollection, LineString } from 'geojson';

export type RouteFeature = Feature<LineString, Route>;

export type Route = {
  speed: number;
  location: string;
  title: string;
  slug: string;
  subtitle: string;
  thumbnail: string;
  rotation: number;
};

export type Tour = {
  title: string;
  subtitle: string;
  thumbnail: string;
  routes: FeatureCollection<LineString, Route>;
};
