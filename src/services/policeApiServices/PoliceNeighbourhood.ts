import axios from "axios";
import {
  Neighbourhood,
  NeighbourhoodSpecific,
  Coordinate,
} from "../../interfaces/PoliceApi";
import { postcodeService } from "../PostcodeApiService";
import { POLICE_API_URL } from "../../constants";

export class PoliceNeighbourhoodApiService {
  /** TODO - is this correct? List of neighbourhoods */
  public getList(): Promise<Neighbourhood[]> {
    return axios.get(`${POLICE_API_URL}/neighbourhoods`);
  }

  public get(
    force: string,
    neighbourhood: string
  ): Promise<NeighbourhoodSpecific> {
    return axios.get(`${POLICE_API_URL}/${force}/${neighbourhood}`);
  }

  public async getBoundary(
    force: string,
    neighbourhood: string
  ): Promise<Coordinate[] | null> {
    const response = await axios.get(
      `${POLICE_API_URL}/${force}/${neighbourhood}/boundary`
    );
    if (response) {
      return response.data;
    }
    return null;
  }

  public async locate(latitude: string, longitude: string): Promise<any> {
    const response = await axios.get(
      `${POLICE_API_URL}/locate-neighbourhood?q=${latitude},${longitude}`
    );
    if (response) {
      return response.data;
    }
    return null;
  }

  public async getBoundaryFromCoordinates({
    latitude,
    longitude,
  }: Coordinate): Promise<any> {
    try {
      const NHLocated = await this.locate(latitude, longitude);

      if (NHLocated) {
        const { force, neighbourhood } = NHLocated;

        const boundary = await axios.get(
          `${POLICE_API_URL}/${force}/${neighbourhood}/boundary`
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

  public async getBoundaryFromPostcode(postcode: string): Promise<any> {
    const coordinates = await postcodeService.getCoordinates(
      postcode.replace(/\s/g, "")
    );
    if (coordinates) {
      return await this.getBoundaryFromCoordinates(coordinates);
    }
    return null;
  }
}

export const policeNeighbourhoodService = new PoliceNeighbourhoodApiService();
