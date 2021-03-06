import axios from "axios";
import {
  NeighbourhoodListItem,
  Neighbourhood,
  Coordinate,
} from "../../interfaces/PoliceApi";
import { POLICE_API_URL } from "../../constants";
import { transformNeighbourhoodData } from "../../transformers/PoliceForceNeighbourhood";

export class PoliceNeighbourhoodApiService {
  public async getList(
    forceId: string
  ): Promise<NeighbourhoodListItem[] | undefined> {
    try {
      const response = await axios.get(
        `${POLICE_API_URL}/${forceId}/neighbourhoods`
      );
      if (response) {
        return response.data.map((item: NeighbourhoodListItem) => ({
          ...item,
          forceId,
        }));
      }
    } catch (e) {
      throw new Error("Police force neighbourhoods not found");
    }
  }

  public async get(
    force: string,
    neighbourhood: string
  ): Promise<Neighbourhood | undefined> {
    try {
      const response = await axios.get(
        `${POLICE_API_URL}/${force}/${neighbourhood}`
      );
      if (response) {
        return transformNeighbourhoodData(response.data);
      }
    } catch (e) {
      throw new Error("Police force neighbourhoods not found");
    }
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
}

export const policeNeighbourhoodService = new PoliceNeighbourhoodApiService();
