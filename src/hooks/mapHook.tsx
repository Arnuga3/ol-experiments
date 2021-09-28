import { useSelector } from "react-redux";
import { AppState } from "../redux/reducers";

export const useMap = () => {
  return useSelector(({ mapState }: AppState) => mapState);
};
