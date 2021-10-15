import { Dispatch } from "redux";
import { showError } from "../notificationsActions";

import { NeighbourhoodListItem } from "../../../interfaces/PoliceApi";
import { policeNeighbourhoodService } from "../../../services/policeApiServices/PoliceNeighbourhood";
import { loadingStart, loadingStop } from "../loaderActions";

export enum PoliceNeighbourhoodActions {
  STORE_POLICE_FORCES_NEIGHBOURHOOD_LIST = "STORE_POLICE_FORCES_NEIGHBOURHOOD_LIST",
  STORE_POLICE_FORCES_NEIGHBOURHOOD = "STORE_POLICE_FORCES_NEIGHBOURHOOD",
  STORE_POLICE_FORCES_NEIGHBOURHOOD_BOUNDARY = "STORE_POLICE_FORCES_NEIGHBOURHOOD_BOUNDARY",
}

export interface StorePoliceForceNeighbourhoodsList {
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_LIST;
  forceId: string;
  neighbourhoods: NeighbourhoodListItem[];
}

export interface StorePoliceForceNeighbourhood {
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD;
  forceId: string;
  neighbourhood: any;
}

export interface StorePoliceForceNeighbourhoodBoundary {
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_BOUNDARY;
  forceId: string;
  neighbourhoodId: string;
  boundary: any;
}

export const storePoliceForceNeighbourhoodsList = (
  forceId: string,
  neighbourhoods: NeighbourhoodListItem[]
): StorePoliceForceNeighbourhoodsList => ({
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_LIST,
  forceId,
  neighbourhoods,
});

export const storePoliceForceNeighbourhoodBoundary = (
  forceId: string,
  neighbourhoodId: string,
  boundary: any
): StorePoliceForceNeighbourhoodBoundary => ({
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_BOUNDARY,
  forceId,
  neighbourhoodId,
  boundary,
});

export const storePoliceForceNeighbourhood = (
  forceId: string,
  neighbourhood: any
): StorePoliceForceNeighbourhood => ({
  type: PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD,
  forceId,
  neighbourhood,
});

export function getPoliceForceNeighbourhoodsList(forceId: string) {
  return async (dispatch: Dispatch) => {
    try {
      const neighbourhoods = await policeNeighbourhoodService.getList(forceId);
      if (neighbourhoods) {
        dispatch(storePoliceForceNeighbourhoodsList(forceId, neighbourhoods));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceNeighbourhood(
  forceId: string,
  neighbourhoodId: string
) {
  return async (dispatch: Dispatch) => {
    try {
      const data = await policeNeighbourhoodService.get(
        forceId,
        neighbourhoodId
      );
      if (data) {
        dispatch(storePoliceForceNeighbourhood(forceId, data));
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}

export function getPoliceNeighbourhoodBoundary(
  forceId: string,
  neighbourhoodId: string
) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loadingStart());

      const data = await policeNeighbourhoodService.getBoundary(
        forceId,
        neighbourhoodId
      );
      dispatch(loadingStop());

      if (data) {
        dispatch(
          storePoliceForceNeighbourhoodBoundary(forceId, neighbourhoodId, data)
        );
      }
    } catch (e: any) {
      dispatch(showError(e));
    }
  };
}
