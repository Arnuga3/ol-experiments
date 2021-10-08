import { Dispatch } from "redux";
import { policeApiService } from "../../services/PoliceApiService";
import { showError } from "./notificationsActions";

export enum PoliceDataActions {
  STORE_POLICE_FORCES_LIST = "STORE_POLICE_FORCES_LIST",
  STORE_POLICE_FORCE = "STORE_POLICE_FORCE",
  STORE_POLICE_FORCE_NAME_BOUNDARY = "STORE_POLICE_FORCE_NAME_BOUNDARY",
  STORE_POLICE_FORCE_INFO = "STORE_POLICE_FORCE_INFO",
}

export interface StorePoliceForcesList {
  type: PoliceDataActions.STORE_POLICE_FORCES_LIST;
  forces: { id: string; name: string }[];
}

export interface StorePoliceForce {
  type: PoliceDataActions.STORE_POLICE_FORCE;
  force: any;
}

export interface StorePoliceForceNameAndBoundary {
  type: PoliceDataActions.STORE_POLICE_FORCE_NAME_BOUNDARY;
  boundary: any; // TODO - Set proper types here
  policeForceName: string;
}

export interface StorePoliceForceInformation {
  type: PoliceDataActions.STORE_POLICE_FORCE_INFO;
  policeForceInformation: any; // TODO - Set proper types here
}

export const storePoliceForcesList = (
  forces: { id: string; name: string }[]
): StorePoliceForcesList => ({
  type: PoliceDataActions.STORE_POLICE_FORCES_LIST,
  forces,
});

export const storePoliceForce = (force: any): StorePoliceForce => ({
  type: PoliceDataActions.STORE_POLICE_FORCE,
  force,
});

export const storePoliceForceNameAndBoundary = (
  boundary: any,
  policeForceName: string
): StorePoliceForceNameAndBoundary => ({
  type: PoliceDataActions.STORE_POLICE_FORCE_NAME_BOUNDARY,
  boundary,
  policeForceName,
});

export const storePoliceForceInformation = (
  policeForceInformation: any
): StorePoliceForceInformation => ({
  type: PoliceDataActions.STORE_POLICE_FORCE_INFO,
  policeForceInformation,
});

export function getPoliceForcesList() {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeApiService.getForces();
      if (data) {
        dispatch(storePoliceForcesList(data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceForce(force: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeApiService.getForce(force);
      if (data) {
        dispatch(storePoliceForce(data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

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
