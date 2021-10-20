import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { mapService } from "../../../services/MapService";

import { useDispatch } from "react-redux";
import { useCrimesData } from "../../../hooks/police/crimesDataHook";

interface Props {
  onLoading: (loading: boolean) => void;
}

export const Map: React.FC<Props> = ({ onLoading }) => {
  const dispatch = useDispatch();

  const { crimes } = useCrimesData();

  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const initMap = mapService.initMap(mapRef.current);

    setTimeout(() => {
      // mapService.trackMapPosition(initMap, dispatch);
      initMap.updateSize();
    }, 100);

    setMap(initMap);
  }, []);

  useEffect(() => {
    if (map && crimes && crimes.length > 0) {
      mapService.drawPoints(map, crimes);
    }
  }, [map, crimes]);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
`;
