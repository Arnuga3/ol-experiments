import { Reducer } from "redux";
import { Force, ForceListItem } from "../../interfaces/PoliceApi";
import { PoliceDataActions } from "../actions/police/policeForceActions";
import { PoliceNeighbourhoodActions } from "../actions/police/policeNeighbourhoodActions";

export interface State {
  dataset: any;
  forces: ForceListItem[];
  neighbourhoodsIndexMap: any;
}

const defaultState: State = {
  dataset: null,
  forces: [],
  neighbourhoodsIndexMap: {},
};

const reducer: Reducer<State> = (state: State = defaultState, action) => {
  const force = action.forceId;
  const neighbourhood = action.neighbourhoodId;

  switch (action.type) {
    case PoliceDataActions.STORE_POLICE_FORCES_LIST:
      return {
        ...state,
        forces: action.forces,
        dataset: toMap(action.forces),
      };

    case PoliceDataActions.STORE_POLICE_FORCE:
      return {
        ...state,
        dataset: updateRecord(state.dataset, action.force),
      };

    // case PoliceDataActions.STORE_POLICE_FORCE_NAME_BOUNDARY:
    //   return {
    //     ...state,
    //     boundary: action.boundary,
    //     selectedForce: action.policeForceName,
    //   };

    // case PoliceDataActions.STORE_POLICE_FORCE_INFO:
    //   return {
    //     ...state,
    //     policeForce: action.policeForceInformation,
    //   };

    case PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_LIST:
      const map = toMap(action.neighbourhoods);
      return {
        ...state,
        dataset: {
          ...state.dataset,
          [force]: {
            ...state.dataset[force],
            neighbourhoods: action.neighbourhoods,
            neighbourhoodsMap: map,
          },
        },
        neighbourhoodsIndexMap: { ...state.neighbourhoodsIndexMap, ...map },
      };

    case PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD:
      return {
        ...state,
        dataset: {
          ...state.dataset,
          [force]: {
            ...state.dataset[force],
            neighbourhoodsMap: updateRecord(
              state.dataset[force].neighbourhoodsMap,
              action.neighbourhood
            ),
          },
        },
      };

    case PoliceNeighbourhoodActions.STORE_POLICE_FORCES_NEIGHBOURHOOD_BOUNDARY:
      return {
        ...state,
        dataset: {
          ...state.dataset,
          [force]: {
            ...state.dataset[force],
            neighbourhoodsMap: {
              ...state.dataset[force].neighbourhoodsMap,
              [neighbourhood]: {
                ...state.dataset[force].neighbourhoodsMap[neighbourhood],
                boundary: action.boundary,
              },
            },
          },
        },
      };

    default:
      return state;
  }
};

export { reducer as policeDataReducer };

function toMap(forcesList: any[]) {
  return forcesList.reduce(
    (map: any, { id, name, forceId }: any) => ({
      ...map,
      [id]: { id, name, forceId },
    }),
    {}
  );
}

function updateRecord(dataset: any, record: Force) {
  return {
    ...dataset,
    [record.id]: {
      ...dataset[record.id],
      data: record,
    },
  };
}
