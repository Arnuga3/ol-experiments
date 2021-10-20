import { Dispatch } from "redux";
import { showError } from "../notificationsActions";

import { CrimeCategory } from "../../../interfaces/PoliceApi";
import { crimesService } from "../../../services/policeApiServices/Crimes";

export enum CrimesDataActions {
  STORE_CRIME_CATEGORIES = "STORE_CRIME_CATEGORIES",
  STORE_CRIMES = "STORE_CRIMES",
}

export interface StoreCrimeCategories {
  type: CrimesDataActions.STORE_CRIME_CATEGORIES;
  crimeCategories: CrimeCategory[];
}

export interface StoreCrimes {
  type: CrimesDataActions.STORE_CRIMES;
  crimes: any;
}

export const storeCrimeCategories = (
  crimesCategories: CrimeCategory[]
): StoreCrimeCategories => ({
  type: CrimesDataActions.STORE_CRIME_CATEGORIES,
  crimeCategories: crimesCategories,
});

export const storeCrimes = (crimes: any): StoreCrimes => ({
  type: CrimesDataActions.STORE_CRIMES,
  crimes,
});

export function getCrimesCategories(date: any) {
  return async (dispatch: Dispatch) => {
    try {
      const crimeCategories = await crimesService.getCrimeCategories(date);
      if (crimeCategories) {
        dispatch(storeCrimeCategories(crimeCategories));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getCrimesByPostcode(postcode: string) {
  return async (dispatch: Dispatch) => {
    try {
      const crimes = await crimesService.getWithinOneMileByPostcode(postcode);
      if (crimes) {
        dispatch(storeCrimes(crimes));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getCrimesForArea(corners: any) {
  return async (dispatch: Dispatch) => {
    try {
      const crimes = await crimesService.getWithinCustomArea(corners, 'all-crime', '2020-06');
      if (crimes) {
        dispatch(storeCrimes(crimes));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}
