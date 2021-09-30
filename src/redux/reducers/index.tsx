import { combineReducers } from "redux";
import { mapReducer, State as MapState } from "./mapReducer";
import { policeForceReducer, State as PoliceForceState } from "./policeForceReducer";
import {
  notificationsReducer,
  State as NotificationsState,
} from "./notificationsReducer";

export interface AppState {
  mapState: MapState;
  policeForceState: PoliceForceState;
  notificationsState: NotificationsState;
}

export default combineReducers({
  mapState: mapReducer,
  policeForceState: policeForceReducer,
  notificationsState: notificationsReducer,
});
