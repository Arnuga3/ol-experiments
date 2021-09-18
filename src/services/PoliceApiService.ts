import axios from "axios";
import {
  Force,
  ForceSpecific,
  Neighbourhood,
  NeighbourhoodSpecific,
  Coordinate,
  NeighbourhoodLocated,
} from "../interfaces/PoliceApi";

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

  public async getNeighbourhoodBoundaryByCoordinates(
    latitude: string,
    longitude: string
  ): Promise<Coordinate[] | null> {
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
}

export const policeApiService = new PoliceApiService();
