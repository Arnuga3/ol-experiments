import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { policeApiService } from "../../../services/PoliceApiService";
import { mapService } from "../../../services/MapService";

import { useIonToast } from "@ionic/react";
import { useMap } from "../../../hooks/mapHook";
import { useDispatch } from "react-redux";

interface Props {
  postcode: string | null;
  onLoading: (loading: boolean) => void;
  onData: (data: any) => void;
}

export const Map: React.FC<Props> = ({ postcode, onLoading, onData }) => {
  const dispatch = useDispatch();
  const [present] = useIonToast();

  const { zoom, center } = useMap();

  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<any>(null);

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

  useEffect(() => {
    if (postcode) {
      onLoading(true);
      displayBoundary(postcode);
    }
  }, [postcode]);

  const displayBoundary = async (postcodeString: string) => {
    try {
      const data = await policeApiService.getCrimesWithinOneMileByPostcode(
        postcodeString
      );
      if (map && data) {
        mapService.drawPoints(map, data);
        onLoading(false);
        onData(data);
      }
    } catch (error: any) {
      onLoading(false);
      present({ message: error, duration: 3000, color: "danger" });
    }
  };

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  filter: brightness(92%);
`;
