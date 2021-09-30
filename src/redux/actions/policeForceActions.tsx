import { Dispatch } from "redux";
import { policeApiService } from "../../services/PoliceApiService";
import { showError } from "./notificationsActions";

export enum PoliceForceActions {
  STORE_POLICE_FORCE_NAME_BOUNDARY = "STORE_POLICE_FORCE_NAME_BOUNDARY",
  STORE_POLICE_FORCE_INFO = "STORE_POLICE_FORCE_INFO",
}

export interface StorePoliceForceNameAndBoundary {
  type: PoliceForceActions.STORE_POLICE_FORCE_NAME_BOUNDARY;
  boundary: any; // TODO - Set proper types here
  policeForceName: string;
}

export interface StorePoliceForceInformation {
  type: PoliceForceActions.STORE_POLICE_FORCE_INFO;
  policeForceInformation: any; // TODO - Set proper types here
}

export const storePoliceForceNameAndBoundary = (
  boundary: any,
  policeForceName: string
): StorePoliceForceNameAndBoundary => ({
  type: PoliceForceActions.STORE_POLICE_FORCE_NAME_BOUNDARY,
  boundary,
  policeForceName,
});

export const storePoliceForceInformation = (
  policeForceInformation: any
): StorePoliceForceInformation => ({
  type: PoliceForceActions.STORE_POLICE_FORCE_INFO,
  policeForceInformation,
});

export function getPoliceForceNameAndBoundary(postcode: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeApiService.getNHBoundaryByPostcode(postcode);
      if (data) {
        dispatch(
          storePoliceForceNameAndBoundary(data.boundary, data.policeForceName)
        );
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceForceInformation(policeForceName: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeApiService.getForce(policeForceName);
      if (data) {
        dispatch(storePoliceForceInformation(data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}
