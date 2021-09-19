import axios from "axios";
import { Coordinate } from "../interfaces/PoliceApi";

export class PostcodeApiService {
  private url: string = "https://api.postcodes.io/postcodes";

  public async getPostcode(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}`);
    if (response) {
      return response.data.result;
    }
    return null;
  }

  public async getPostcodeSuggetions(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}/autocomplete`);
    if (response) {
      return response.data.result;
    }
    return null;
  }

  public async getPostcodeCoordinates(
    postcodeString: string
  ): Promise<Coordinate | null> {
    try {
      const postcode = await this.getPostcode(postcodeString);
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

export const postcodeApiService = new PostcodeApiService();
