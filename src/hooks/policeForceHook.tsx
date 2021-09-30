import { useSelector } from "react-redux";
import { AppState } from "../redux/reducers";

export const usePoliceForce = () => {
  return useSelector(({ policeForceState }: AppState) => policeForceState);
};
