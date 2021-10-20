import { Reducer } from "redux";
import { MapActions } from "../actions/mapActions";

export interface State {
  corners: any;
}

const defaultState: State = {
  corners: null,
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case MapActions.STORE_MAP_POSITION:
      return {
        ...state,
        corners: action.corners,
      };

    default:
      return state;
  }
};

export { reducer as mapReducer };
