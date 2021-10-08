import { combineReducers } from "redux";
import { mapReducer, State as MapState } from "./mapReducer";
import { policeDataReducer, State as PoliceDataState } from "./policeDataReducer";
import {
  notificationsReducer,
  State as NotificationsState,
} from "./notificationsReducer";

export interface AppState {
  mapState: MapState;
  policeDataState: PoliceDataState;
  notificationsState: NotificationsState;
}

export default combineReducers({
  mapState: mapReducer,
  policeDataState: policeDataReducer,
  notificationsState: notificationsReducer,
});
