import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";

export const usePoliceForce = (forceId: string) => {
  return useSelector(({ policeDataState: policeForceState }: AppState) => {
    return policeForceState.dataset[forceId];
  });
};
