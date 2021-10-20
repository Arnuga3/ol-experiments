import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";

export const useCrimesData = () => {
  return useSelector(({ policeDataState: policeForceState }: AppState) => policeForceState);
};
