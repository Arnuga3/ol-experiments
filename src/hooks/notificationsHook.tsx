import { useSelector } from "react-redux";
import { AppState } from "../redux/reducers";

export const useNotifications = () => {
  return useSelector(({ notificationsState }: AppState) => notificationsState);
};
