import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { mapService } from "../../../services/MapService";
import { usePoliceForce } from "../../../hooks/policeForceHook";
import { useDispatch } from "react-redux";
import { storeMapPosition } from "../../../redux/actions/mapActions";

interface Props {
  onLoading: (loading: boolean) => void;
}

export const Map: React.FC<Props> = ({ onLoading }) => {
  const dispatch = useDispatch();
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  const { boundary } = usePoliceForce();

  useEffect(() => {
    if (boundary) {
      mapService.drawBoundary(map, boundary);
    }
  }, [boundary]);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);
    setMap(initMap);
    setTimeout(() => {
      initMap.updateSize();
      initMap.on("moveend", (e) => {
        dispatch(
          storeMapPosition(
            initMap.getView().getZoom() as any,
            initMap.getView().getCenter() as any
          )
        );
      });
    }, 100);
  }, []);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  filter: brightness(92%);
`;
