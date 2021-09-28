import axios from "axios";

import {
  Force,
  Neighbourhood,
  NeighbourhoodSpecific,
  Coordinate,
} from "../interfaces/PoliceApi";

import { transformCrimesData } from "../transformers/Crimes";
import { transformForceData } from "../transformers/PoliceForce";
import { postcodeApiService } from "./PostcodeApiService";

export class PoliceApiService {
  private url: string = "https://data.police.uk/api";

  // POLICE FORCE ENDPOINTS

  /** List of forces */
  public getForces(): Promise<Force[]> {
    return axios.get(`${this.url}/forces`);
  }

  /** Force */
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

  // POLICE NEIGHBOURHOOD ENDPOINTS

  /** List of neighbourhoods */
  public getNHList(): Promise<Neighbourhood[]> {
    return axios.get(`${this.url}/neighbourhoods`);
  }

  /** Neighbourhood */
  public getNH(
    force: string,
    neighbourhood: string
  ): Promise<NeighbourhoodSpecific> {
    return axios.get(`${this.url}/${force}/${neighbourhood}`);
  }

  /** Neighbourhood boundary */
  public async getNHBoundary(
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

  /** Neighbourhood from coordinate */
  public async locateNH(latitude: string, longitude: string): Promise<any> {
    const response = await axios.get(
      `${this.url}/locate-neighbourhood?q=${latitude},${longitude}`
    );
    if (response) {
      return response.data;
    }
    return null;
  }

  public async getNHBoundaryByCoordinates({
    latitude,
    longitude,
  }: Coordinate): Promise<any> {
    try {
      const NHLocated = await this.locateNH(latitude, longitude);

      if (NHLocated) {
        const { force, neighbourhood } = NHLocated;

        const boundary = await axios.get(
          `${this.url}/${force}/${neighbourhood}/boundary`
        );

        if (boundary) {
          return {
            policeForceName: force,
            boundary: boundary.data,
          };
        }
      }
      return null;
    } catch (e) {
      throw new Error("Police neighbourhood not found");
    }
  }

  public async getNHBoundaryByPostcode(postcode: string): Promise<any> {
    const coordinates = await postcodeApiService.getPostcodeCoordinates(
      postcode.replace(/\s/g, "")
    );
    if (coordinates) {
      return await this.getNHBoundaryByCoordinates(coordinates);
    }
    return null;
  }

  // CRIMES ENDPOINTS

  public async getCrimesWithinOneMile(
    latitude: string | number,
    longitude: string | number,
    date?: string // YYYY-MM
  ): Promise<any> {
      const response = await axios.get(
        `${this.url}/crimes-street/all-crime?lat=${latitude}&lng=${longitude}${
          date ? `&date=${date}` : ""
        }`
      );
      if (response && response.data.length > 0) {
        return transformCrimesData(response.data);
      }
      throw new Error("Crimes data not found");
  }

  public async getCrimesWithinOneMileByPostcode(
    postcode: string
  ): Promise<any> {
    const coordinates = await postcodeApiService.getPostcodeCoordinates(
      postcode.replace(/\s/g, "")
    );
    if (coordinates) {
      return await this.getCrimesWithinOneMile(
        coordinates.latitude,
        coordinates.longitude
      );
    }
    return null;
  }
}

export const policeApiService = new PoliceApiService();
