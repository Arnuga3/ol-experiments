import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import _ from "lodash";

export const usePoliceNeighbourhood = (neighbourhoodId: string) => {
  return useSelector(({ policeDataState: policeForceState }: AppState) => {
    const neighbourhoodIndex =
      policeForceState.neighbourhoodsIndexMap[neighbourhoodId];

    return neighbourhoodIndex
      ? _.get(
          policeForceState.dataset,
          [neighbourhoodIndex.forceId, "neighbourhoodsMap", neighbourhoodId],
          null
        )
      : null;
  });
};
