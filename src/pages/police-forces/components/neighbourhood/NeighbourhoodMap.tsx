import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { mapService } from "../../../../services/MapService";
import { Coordinate } from "../../../../interfaces/PoliceApi";
import { useLoader } from "../../../../hooks/loaderHook";
import { Spinner } from "../../../../components/Spinner";

interface Props {
  forceId: string;
  boundary: Coordinate[] | null;
  centre: Coordinate;
}

export const NeighbourhoodMap: React.FC<Props> = ({
  forceId,
  boundary,
  centre,
}) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  const { loading } = useLoader();

  useEffect(() => {
    if (map && boundary) {
      // TODO - Improve the params
      // TODO - Check if smooth zoom possible from loading state
      mapService.drawBoundaryFromCoordinates(map, boundary, true, {
        fill: { color: [61, 194, 255, 0.1] },
      });
      mapService.drawPin(map, centre);
    }
  }, [map, boundary]);

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
    mapService.drawBoundaryFromGeoJson(map, boundary, false);
  };

  return (
    <>
      {loading && <Spinner name="crescent" color="secondary" />}
      <MapContainer ref={mapRef} />
    </>
  );
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;