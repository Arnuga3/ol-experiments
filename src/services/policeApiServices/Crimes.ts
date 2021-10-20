import axios from "axios";
import { transformCrimesData } from "../../transformers/Crimes";
import { postcodeService } from "../PostcodeApiService";
import { POLICE_API_URL } from "../../constants";

export class CrimesApiService {
  public async getCrimeCategories(date: any) {
    try {
      const response = await axios.get(
        `${POLICE_API_URL}/crime-categories?date=${date}`
      );
      if (response) {
        return response.data;
      }
    } catch (e) {
      throw new Error("Crime categories");
    }
  }

  public async getWithinOneMile(
    latitude: string | number,
    longitude: string | number,
    date?: string // YYYY-MM
  ): Promise<any> {
    const response = await axios.get(
      `${POLICE_API_URL}/crimes-street/all-crime?lat=${latitude}&lng=${longitude}${
        date ? `&date=${date}` : ""
      }`
    );
    if (response && response.data.length > 0) {
      return transformCrimesData(response.data);
    }
    throw new Error("Crimes data not found");
  }

  public async getWithinOneMileByPostcode(postcode: string): Promise<any> {
    const coordinates = await postcodeService.getCoordinates(
      postcode.replace(/\s/g, "")
    );
    if (coordinates) {
      return await this.getWithinOneMile(
        coordinates.latitude,
        coordinates.longitude
      );
    }
    return null;
  }

  public async getWithinCustomArea(
    corners: any,
    crimeCategory: string = "all-crime",
    date?: string // YYYY-MM
  ): Promise<any> {
    try {
      const poly = [
        corners.topLeft.reverse().join(','),
        corners.topRight.reverse().join(','),
        corners.bottomRight.reverse().join(','),
        corners.bottomLeft.reverse().join(','),
        corners.topLeft.reverse().join(','),
      ].join(':');

      const response = await axios.post(
        `${POLICE_API_URL}/crimes-street/${crimeCategory}?poly=${poly}${
          date ? `&date=${date}` : ""
        }`
      );

      if (response && response.data.length > 0) {
        return transformCrimesData(response.data);
      }
    } catch (e) {
      console.log(e);
      throw new Error("Crimes data not found");
    }
  }
}

export const crimesService = new CrimesApiService();
