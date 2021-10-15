import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";

export const usePoliceData = () => {
  return useSelector(({ policeDataState: policeForceState }: AppState) => policeForceState);
};
