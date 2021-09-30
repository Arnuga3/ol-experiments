import { Reducer } from "redux";
import { MapActions } from "../actions/mapActions";

export interface State {
  zoom: number | null;
  center: number[] | null;
}

const defaultState: State = {
  zoom: null,
  center: null,
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case MapActions.STORE_MAP_POSITION:
      return {
        ...state,
        zoom: action.zoom,
        center: action.center,
      };

    default:
      return state;
  }
};

export { reducer as mapReducer };
