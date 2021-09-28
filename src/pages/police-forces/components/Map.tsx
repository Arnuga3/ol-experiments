import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { mapService } from "../../../services/MapService";
import { useMap } from "../../../hooks/mapHook";

interface Props {
  onLoading: (loading: boolean) => void;
}

export const Map: React.FC<Props> = ({ onLoading }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  const { boundary } = useMap();

  useEffect(() => {
    if (boundary) {
      mapService.drawBoundary(map, boundary);
    }
  }, [boundary]);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);
    setMap(initMap);
    setTimeout(() => initMap.updateSize(), 100);
  }, []);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
`;
