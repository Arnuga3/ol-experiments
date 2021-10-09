import axios from "axios";
import { Coordinate } from "../interfaces/PoliceApi";

export class PostcodeApiService {
  private url: string = "https://api.postcodes.io/postcodes";

  public async get(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}`);
    if (response) {
      return response.data.result;
    }
    return null;
  }

  public async getSuggetions(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}/autocomplete`);
    if (response) {
      return response.data.result;
    }
    return null;
  }

  public async getCoordinates(
    postcodeString: string
  ): Promise<Coordinate | null> {
    try {
      const postcode = await this.get(postcodeString);
      if (postcode) {
        return {
          latitude: postcode.latitude,
          longitude: postcode.longitude,
        };
      }
      return null;
    } catch (e) {
      throw new Error("Postcode not found");
    }
  }
}

export const postcodeService = new PostcodeApiService();
