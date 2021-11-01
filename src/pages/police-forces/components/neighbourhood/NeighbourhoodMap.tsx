import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { mapService } from "../../../../services/MapService";
import { useLoader } from "../../../../hooks/loaderHook";
import { Spinner } from "../../../../components/Spinner";
import { useDispatch } from "react-redux";
import { storeMapPosition } from "../../../../redux/actions/mapActions";
import { usePoliceNeighbourhood } from "../../../../hooks/police/policeNeighbourhoodHook";
import { getPoliceNeighbourhoodBoundary } from "../../../../redux/actions/police/policeNeighbourhoodActions";
import { IonBadge } from "@ionic/react";

async function drawForceBoundary(map: any, neighbourhood: any) {
  const boundary = await import(
    `./../../../../data/force-boundaries/${neighbourhood.forceId}.json`
  );
  mapService.drawBoundaryFromGeoJson(map, boundary, false, {
    fill: { color: [61, 194, 255, 0.1] },
  });
}

function drawNeighbourhoodPin(map: any, neighbourhood: any) {
  mapService.drawPin(map, neighbourhood.data.centre);
}

// TODO - Improve the params
// TODO - Check if smooth zoom possible from loading state
function drawNeighbourhoodBoundary(map: any, neighbourhood: any) {
  return mapService.drawBoundaryFromCoordinates(
    map,
    neighbourhood.boundary,
    true,
    {
      fill: { color: [61, 194, 255, 0.1] },
    }
  );
}

interface Props {
  neighbourhoodId: string;
}

interface State {
  boundaryRequested: boolean;
  boundaryDisplayed: boolean;
  pinDisplayed: boolean;
  forceBoundaryDisplayed: boolean;
  zoom: number;
}

const defaultState = {
  boundaryRequested: false,
  boundaryDisplayed: false,
  pinDisplayed: false,
  forceBoundaryDisplayed: false,
  zoom: 0,
};

export const NeighbourhoodMap: React.FC<Props> = ({ neighbourhoodId }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);
  const [state, setState] = useState<State>(defaultState);

  const {
    boundaryRequested,
    boundaryDisplayed,
    pinDisplayed,
    forceBoundaryDisplayed,
    zoom,
  } = state;

  const dispatch = useDispatch();
  const { loading } = useLoader();
  const neighbourhood = usePoliceNeighbourhood(neighbourhoodId);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);
    setTimeout(() => initMap.updateSize(), 100);
    setMap(initMap);

    initMap.on("moveend", (e) => {
      setState({ ...state, zoom: initMap.getView().getZoom() as number });
    });
  }, []);

  useEffect(() => {
    if (
      neighbourhood?.forceId &&
      !neighbourhood.boundary &&
      !boundaryRequested
    ) {
      retrieveNeighbourhoodBoundary();
    }
    if (map && neighbourhood) {
      drawData();
    }
  }, [map, neighbourhood]);

  const drawData = () => {
    const { data, boundary, forceId } = neighbourhood;
    let stateUpdated: any = {};

    if (boundary && !boundaryDisplayed) {
      const corners = drawNeighbourhoodBoundary(map, neighbourhood);

      if (corners) {
        dispatch(storeMapPosition(corners));
      }
      stateUpdated.boundaryDisplayed = true;
    }

    if (data && data.centre && !pinDisplayed) {
      drawNeighbourhoodPin(map, neighbourhood);
      stateUpdated.pinDisplayed = true;
    }

    if (forceId && !forceBoundaryDisplayed) {
      drawForceBoundary(map, neighbourhood);
      stateUpdated.forceBoundaryDisplayed = true;
    }

    if (Object.keys(stateUpdated).length > 0) {
      setState({ ...state, ...stateUpdated });
    }
  };

  const retrieveNeighbourhoodBoundary = () => {
    setState({ ...state, boundaryRequested: true });
    dispatch(
      getPoliceNeighbourhoodBoundary(neighbourhood.forceId, neighbourhoodId)
    );
  };

  return (
    <>
      {loading && <Spinner name="crescent" color="secondary" />}
      <MapContainer ref={mapRef} />
      <Badge color="light">
        <small>{`zoom: ${Math.floor(zoom)}`}</small>
      </Badge>
    </>
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Badge = styled(IonBadge)`
  margin: 4px;
`;
