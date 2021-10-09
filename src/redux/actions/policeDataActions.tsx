import { Dispatch } from "redux";
import { showError } from "./notificationsActions";

import forces from './../../data/forces.json';
import { policeForceService } from "../../services/policeApiServices/PoliceForce";
import { policeNeighbourhoodService } from "../../services/policeApiServices/PoliceNeighbourhood";

export enum PoliceDataActions {
  STORE_POLICE_FORCES_LIST = "STORE_POLICE_FORCES_LIST",
  STORE_POLICE_FORCE = "STORE_POLICE_FORCE",
  STORE_POLICE_FORCE_ID = "STORE_POLICE_FORCE_ID",
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

export interface StorePoliceForceId {
  type: PoliceDataActions.STORE_POLICE_FORCE_ID;
  forceId: string;
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

export const storePoliceForceId = (forceId: string): StorePoliceForceId => ({
  type: PoliceDataActions.STORE_POLICE_FORCE_ID,
  forceId,
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
      if (forces) {
        dispatch(storePoliceForcesList(forces));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceForce(forceId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeForceService.get(forceId);
      if (data) {
        dispatch(storePoliceForce(data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceForceFromPostcode(postcode: string, history: any) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeNeighbourhoodService.getBoundaryFromPostcode(postcode);
      if (data && data.policeForceName) {
        history.push(`/police-force/${data.policeForceName}`);
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceForceNameAndBoundary(postcode: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeNeighbourhoodService.getBoundaryFromPostcode(postcode);
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

export function getPoliceForceInformation(forceId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeForceService.get(forceId);
      if (data) {
        dispatch(storePoliceForceInformation(data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}
