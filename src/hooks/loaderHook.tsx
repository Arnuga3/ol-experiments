import { useSelector } from "react-redux";
import { AppState } from "../redux/reducers";

export const useLoader = () => {
  return useSelector(({ loaderState }: AppState) => loaderState);
};
