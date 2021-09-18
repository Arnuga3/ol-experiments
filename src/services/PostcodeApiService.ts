import axios from "axios";

interface Postcode {
  status: string;
  result: any;
}

export class PostcodeApiService {
  private url: string = "https://api.postcodes.io/postcodes";

  public async getPostcode(postcode: string): Promise<any | null> {
    const response = await axios.get(`${this.url}/${postcode}`);
    if (response) {
      return response.data.result
    }
    return null;
  }
}

export const postcodeApiService = new PostcodeApiService();
