import { Reducer } from "redux";
import { LoaderActions } from "../actions/loaderActions";

export interface State {
  loading: boolean;
}

const defaultState: State = {
  loading: false,
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case LoaderActions.LOADING_START:
      return {
        loading: true,
      };

    case LoaderActions.LOADING_STOP:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export { reducer as loaderReducer };
