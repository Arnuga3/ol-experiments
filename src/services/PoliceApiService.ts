import axios from "axios";
import _ from "lodash";
import {
  globeOutline,
  logoTwitter,
  callOutline,
  linkOutline,
  logoFacebook,
  logoYoutube,
} from "ionicons/icons";
import {
  Force,
  Neighbourhood,
  NeighbourhoodSpecific,
  Coordinate,
} from "../interfaces/PoliceApi";
import { postcodeApiService } from "./PostcodeApiService";

type ContactType = "website" | "twitter" | "telephone";

function getEngagementMethodIcon(type: ContactType) {
  switch (type.toLowerCase()) {
    case "website":
      return globeOutline;
    case "twitter":
      return logoTwitter;
    case "facebook":
      return logoFacebook;
    case "youtube":
      return logoYoutube;
    case "telephone":
      return callOutline;
    default:
      return linkOutline;
  }
}

function transformForceData(data: any) {
  let engagement_methods: any = [];

  if (data.telephone) {
    engagement_methods = [
      ...engagement_methods,
      {
        name: data.telephone,
        type: "telephone",
        icon: getEngagementMethodIcon("telephone"),
        url: `tel:${data.telephone}`,
      },
    ];
  }

  if (data.url) {
    engagement_methods = [
      ...engagement_methods,
      {
        name: "Website",
        type: "website",
        icon: getEngagementMethodIcon("website"),
        url: data.url,
      },
    ];
  }

  if (data.engagement_methods) {
    const methods = data.engagement_methods
      .filter((method: any) => {
        const type = method.type || method.title;
        return !type.toLowerCase().includes("website" || "telephone");
      })
      .map((method: any) => {
        const type = method.type || method.title;
        return {
          name: type.charAt(0).toUpperCase() + type.slice(1),
          type: type.toLowerCase(),
          icon: getEngagementMethodIcon(type),
          url: method.url,
        };
      });
    engagement_methods = [...engagement_methods, ...methods];
  }

  return {
    ...data,
    engagement_methods: _.uniqBy(engagement_methods, "type"),
  };
}

export class PoliceApiService {
  private url: string = "https://data.police.uk/api";

  public getForces(): Promise<Force[]> {
    return axios.get(`${this.url}/forces`);
  }

  public async getForce(force: string): Promise<any | null> {
    try {
      const response = await axios.get(`${this.url}/forces/${force}`);
      if (response) {
        return transformForceData(response.data);
      }
    } catch (e) {
      throw new Error("Police force not found");
    }
  }

  public getNeighbourhoods(): Promise<Neighbourhood[]> {
    return axios.get(`${this.url}/neighbourhoods`);
  }

  public getNeighbourhood(
    force: string,
    neighbourhood: string
  ): Promise<NeighbourhoodSpecific> {
    return axios.get(`${this.url}/${force}/${neighbourhood}`);
  }

  public async getNeighbourhoodBoundary(
    force: string,
    neighbourhood: string
  ): Promise<Coordinate[] | null> {
    const response = await axios.get(
      `${this.url}/${force}/${neighbourhood}/boundary`
    );
    if (response) {
      return response.data;
    }
    return null;
  }

  public async getNeighbourhoodBoundaryByCoordinates({
    latitude,
    longitude,
  }: Coordinate): Promise<any | null> {
    try {
      const NHLocated = await this.locateNeighbourhood(latitude, longitude);

      if (NHLocated) {
        const { force, neighbourhood } = NHLocated;

        const boundary = await axios.get(
          `${this.url}/${force}/${neighbourhood}/boundary`
        );

        if (boundary) {
          return {
            force,
            boundary: boundary.data,
          };
        }
      }
      return null;
    } catch (e) {
      throw new Error("Police neighbourhood not found");
    }
  }

  public async locateNeighbourhood(
    latitude: string,
    longitude: string
  ): Promise<any | null> {
    const response = await axios.get(
      `${this.url}/locate-neighbourhood?q=${latitude},${longitude}`
    );
    if (response) {
      return response.data;
    }
    return null;
  }

  public async getNHBoundary(postcode: string): Promise<any | null> {
    const coordinates = await postcodeApiService.getPostcodeCoordinates(
      postcode.replace(/\s/g, "")
    );
    if (coordinates) {
      return await this.getNeighbourhoodBoundaryByCoordinates(coordinates);
    }
    return null;
  }
}

export const policeApiService = new PoliceApiService();
