import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { usePoliceForce } from "../../../hooks/policeForceHook";
import { useDispatch } from "react-redux";
import { useMap } from "../../../hooks/mapHook";

import { mapService } from "../../../services/MapService";

interface Props {
  onLoading: (loading: boolean) => void;
}

export const Map: React.FC<Props> = ({ onLoading }) => {
  const dispatch = useDispatch();
  const { zoom, center } = useMap();
  const { boundary } = usePoliceForce();

  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (boundary) {
      mapService.drawBoundary(map, boundary);
    }
  }, [boundary]);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);

    setTimeout(() => {
      mapService.trackMapPosition(initMap, dispatch);
      initMap.updateSize();
    }, 100);

    setMap(initMap);
  }, []);
  
  useEffect(() => {
    if (map && zoom && center) {
      mapService.updateMapPosition(map, zoom, center);
    }
  }, [map, zoom, center]);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  filter: brightness(92%);
`;
