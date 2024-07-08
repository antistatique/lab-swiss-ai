import { Feature, FeatureCollection, LineString } from 'geojson';

export type RouteFeature = Feature<LineString, Route>;

export type Route = {
  speed: number;
  slug: string;
  thumbnail: string;
  rotation: number;
};

export type Tour = {
  thumbnail: string;
  routes: FeatureCollection<LineString, Route>;
};
