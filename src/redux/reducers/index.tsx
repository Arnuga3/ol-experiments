import { combineReducers } from "redux";
import { loaderReducer, State as LoaderState } from "./loaderReducer";
import { mapReducer, State as MapState } from "./mapReducer";
import {
  policeDataReducer,
  State as PoliceDataState,
} from "./policeDataReducer";
import {
  notificationsReducer,
  State as NotificationsState,
} from "./notificationsReducer";

export interface AppState {
  mapState: MapState;
  policeDataState: PoliceDataState;
  notificationsState: NotificationsState;
  loaderState: LoaderState;
}

export default combineReducers({
  mapState: mapReducer,
  policeDataState: policeDataReducer,
  notificationsState: notificationsReducer,
  loaderState: loaderReducer,
});
