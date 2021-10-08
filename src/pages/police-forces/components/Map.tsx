import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { mapService } from "../../../services/MapService";

interface Props {
  forceId: string;
}

export const Map: React.FC<Props> = ({ forceId }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map && forceId) {
      mapService.drawGEOJSONBoundary(map, forceId);
    }
  }, [map, forceId]);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);

    setTimeout(() => {
      initMap.updateSize();
    }, 100);

    setMap(initMap);
  }, []);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;
