import { Dispatch } from "redux";
import { showError } from "../notificationsActions";

import { policeForceService } from "../../../services/policeApiServices/PoliceForce";

import { ForceListItem } from "../../../interfaces/PoliceApi";

import forces from '../../../data/forces.json';

export enum PoliceDataActions {
  STORE_POLICE_FORCES_LIST = "STORE_POLICE_FORCES_LIST",
  STORE_POLICE_FORCE = "STORE_POLICE_FORCE",

  STORE_POLICE_FORCE_NAME_BOUNDARY = "STORE_POLICE_FORCE_NAME_BOUNDARY",
  STORE_POLICE_FORCE_INFO = "STORE_POLICE_FORCE_INFO",
}

export interface StorePoliceForcesList {
  type: PoliceDataActions.STORE_POLICE_FORCES_LIST;
  forces: ForceListItem[];
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
  forces: ForceListItem[]
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
      const forceId = await policeForceService.findByPostcode(postcode);
      if (forceId) {
        history.push(`/police-force/${forceId}`);
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
