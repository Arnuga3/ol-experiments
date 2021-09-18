export interface Force {
  id: string;
  name: string;
}

export interface ForceSpecific extends Force {
  url: string;
  telephone: string;
  description: string;
  engagement_methods: any[];
}

export interface Neighbourhood {
  id: string;
  name: string;
}

export interface NeighbourhoodSpecific extends Neighbourhood {
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
