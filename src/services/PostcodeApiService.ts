import axios from "axios";
import { Coordinate } from "../interfaces/PoliceApi";

export class PostcodeApiService {
  private url: string = "https://api.postcodes.io/postcodes";

  public async getPostcode(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}`);
    if (response) {
      return response.data.result
    }
    return null;
  }
  
  public async getPostcodeCoordinates(postcode: string): Promise<Coordinate | null> {
    const pc = await this.getPostcode(postcode);
    if (pc) {
      return {
        latitude: pc.latitude,
        longitude: pc.longitude,
      }
    }
    return null;
  }
}

export const postcodeApiService = new PostcodeApiService();
