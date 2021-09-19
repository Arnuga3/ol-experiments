import axios from "axios";
import {
  Force,
  ForceSpecific,
  Neighbourhood,
  NeighbourhoodSpecific,
  Coordinate,
} from "../interfaces/PoliceApi";
import { postcodeApiService } from "./PostcodeApiService";

export class PoliceApiService {
  private url: string = "https://data.police.uk/api";

  public getForces(): Promise<Force[]> {
    return axios.get(`${this.url}/forces`);
  }

  public getForce(force: string): Promise<ForceSpecific> {
    return axios.get(`${this.url}/forces/${force}`);
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
  }: Coordinate): Promise<Coordinate[] | null> {
    try {
      const NHLocated = await this.locateNeighbourhood(latitude, longitude);

      if (NHLocated) {
        const { force, neighbourhood } = NHLocated;

        const boyndary = await axios.get(
          `${this.url}/${force}/${neighbourhood}/boundary`
        );

        if (boyndary) {
          return boyndary.data;
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

  public async getNHBoundary(postcode: string): Promise<Coordinate[] | null> {
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
