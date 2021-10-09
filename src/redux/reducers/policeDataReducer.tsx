import { Reducer } from "redux";
import { PoliceDataActions } from "../actions/policeDataActions";

export interface State {
  forces: { id: string; name: string }[];
  force: any;
  boundary: any;
  forceId: string | null;
  policeForce: any;
}

const defaultState: State = {
  forces: [],
  force: null,
  boundary: null,
  forceId: null,
  policeForce: null,
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case PoliceDataActions.STORE_POLICE_FORCES_LIST:
      return {
        ...state,
        forces: action.forces,
      };

    case PoliceDataActions.STORE_POLICE_FORCE:
      return {
        ...state,
        force: action.force,
      };

    case PoliceDataActions.STORE_POLICE_FORCE_ID:
      return {
        ...state,
        forceId: action.forceId,
      };

    case PoliceDataActions.STORE_POLICE_FORCE_NAME_BOUNDARY:
      return {
        ...state,
        boundary: action.boundary,
        forceId: action.policeForceName,
      };

    case PoliceDataActions.STORE_POLICE_FORCE_INFO:
      return {
        ...state,
        policeForce: action.policeForceInformation,
      };

    default:
      return state;
  }
};

export { reducer as policeDataReducer };
