import { Reducer } from "redux";
import { NotificationsActions } from "../actions/notificationsActions";
import { uuidv4 } from "../../utils";

export interface Notification {
  id: string;
  message: string;
  duration: number;
  color: "danger" | "success";
}

export interface State {
  notifications: Notification[];
}

const defaultState: State = {
  notifications: [],
};

const DURATION = 3000;

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  switch (action.type) {
    case NotificationsActions.SHOW_ERROR_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: uuidv4(),
            message: action.message,
            duration: DURATION,
            color: "danger",
          },
        ],
      };

    case NotificationsActions.SHOW_SUCCESS_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: uuidv4(),
            message: action.message,
            duration: DURATION,
            color: "success",
          },
        ],
      };

    case NotificationsActions.HIDE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: any) => notification.id !== action.id
        ),
      };

    default:
      return state;
  }
};

export { reducer as notificationsReducer };
