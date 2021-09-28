import { Reducer } from "redux";
import { MapActions } from "../actions/mapActions";

export interface State {
  boundary: any;
  policeForceName: string | null;
  policeForce: any;
}

const defaultState: State = {
  boundary: null,
  policeForceName: null,
  policeForce: null,
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case MapActions.STORE_POLICE_FORCE_NAME_BOUNDARY:
      return {
        ...state,
        boundary: action.boundary,
        policeForceName: action.policeForceName,
      };

    case MapActions.STORE_POLICE_FORCE_INFO:
      return {
        ...state,
        policeForce: action.policeForceInformation,
      };

    default:
      return state;
  }
};

export { reducer as mapReducer };
