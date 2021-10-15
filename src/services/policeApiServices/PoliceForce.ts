import axios from "axios";
import { Coordinate, ForceListItem } from "../../interfaces/PoliceApi";
import { transformForceData } from "../../transformers/PoliceForce";
import { POLICE_API_URL } from "../../constants";
import { policeNeighbourhoodService } from "./PoliceNeighbourhood";
import { postcodeService } from "../PostcodeApiService";

export class PoliceForceApiService {
  /** List of forces */
  public async getList(): Promise<ForceListItem[] | undefined> {
    try {
      const response = await axios.get(`${POLICE_API_URL}/forces`);
      if (response) {
        return response.data;
      }
    } catch (e) {
      throw new Error("Police forces not found");
    }
  }

  /** Force */
  public async get(forceId: string): Promise<any> {
    try {
      const response = await axios.get(`${POLICE_API_URL}/forces/${forceId}`);
      if (response) {
        return transformForceData(response.data);
      }
    } catch (e) {
      throw new Error("Police force not found");
    }
  }

  public async findByPostcode(postcode: string): Promise<any> {
    const coordinates: Coordinate | null = await postcodeService.getCoordinates(
      postcode.replace(/\s/g, "")
    );

    if (coordinates) {
      const data = await policeNeighbourhoodService.locate(
        coordinates.latitude,
        coordinates.longitude
      );
      if (data) {
        return data.force;
      }
    }
    return null;
  }
}

export const policeForceService = new PoliceForceApiService();
