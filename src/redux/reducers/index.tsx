import { combineReducers } from "redux";
import { mapReducer, State as MapState } from "./mapReducer";
import {
  notificationsReducer,
  State as NotificationsState,
} from "./notificationsReducer";

export interface AppState {
  mapState: MapState;
  notificationsState: NotificationsState;
}

export default combineReducers({
  mapState: mapReducer,
  notificationsState: notificationsReducer,
});
