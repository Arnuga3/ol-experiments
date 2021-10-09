import axios from "axios";
import { Force } from "../../interfaces/PoliceApi";
import { transformForceData } from "../../transformers/PoliceForce";
import { POLICE_API_URL } from "../../constants";

export class PoliceForceApiService {
  /** List of forces */
  public async getList(): Promise<Force[] | any> {
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
  public async get(forceId: string): Promise<any | null> {
    try {
      const response = await axios.get(`${POLICE_API_URL}/forces/${forceId}`);
      if (response) {
        return transformForceData(response.data);
      }
    } catch (e) {
      throw new Error("Police force not found");
    }
  }
}

export const policeForceService = new PoliceForceApiService();
