import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { mapService } from "../../../../services/MapService";

interface Props {
  forceId: string;
}

export const ForceMap: React.FC<Props> = ({ forceId }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (map && forceId) {
      drawForceBoundary(forceId);
    }
  }, [map, forceId]);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);
    setTimeout(() => initMap.updateSize(), 100);
    setMap(initMap);
  }, []);

  const drawForceBoundary = async (forceId: string) => {
    const boundary = await import(
      `./../../../../data/force-boundaries/${forceId}.json`
    );
    mapService.drawBoundaryFromGeoJson(map, boundary, true, {
      fill: { color: [61, 194, 255, 0.2] },
    });
  };

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;
