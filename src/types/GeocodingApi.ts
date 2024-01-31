import { Feature } from 'geojson';

export type GeocodingApiResponse = {
  type: 'FeatureCollection';
  query: [number, number];
  features: GeocodingFeature[];
  attribution: string;
};

type GeocodingFeature = Feature & {
  id: string;
  type: string;
  place_type: PlaceType[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  address?: string;
  context?: Context[];
  bbox?: number[];
};

type Context = {
  id: string;
  text: string;
  mapbox_id?: string;
  wikidata?: string;
  short_code?: string;
};

type Properties = {
  accuracy?: string;
  mapbox_id?: string;
  wikidata?: string;
  short_code?: string;
};

type PlaceType =
  | 'country'
  | 'region'
  | 'postcode'
  | 'district'
  | 'place'
  | 'locality'
  | 'neighborhood'
  | 'address'
  | 'poi';
