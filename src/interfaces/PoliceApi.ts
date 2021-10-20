export interface ForceListItem {
  id: string;
  name: string;
}

export interface Force extends ForceListItem {
  url: string;
  telephone: string;
  description: string;
  engagement_methods: any[];
}

export interface NeighbourhoodListItem {
  id: string;
  name: string;
}

export interface Neighbourhood extends NeighbourhoodListItem {
  url_force: string;
  contact_details: any;
  links: any[];
  description: string;
  centre: any;
  locations: any[];
  population: string;
}

export interface NeighbourhoodLocated {
  force: string;
  neighbourhood: string;
}

export interface Coordinate {
  latitude: string;
  longitude: string;
}

export interface CrimeCategory {
  url: string;
  name: string;
}