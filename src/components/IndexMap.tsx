import React, { useState, useEffect, useRef } from "react";

import "ol/ol.css";
import { Map, View } from "ol";
import { Stamen } from "ol/source";
import { Tile } from "ol/layer";
import { transform } from "ol/proj";

import { policeApiService } from "../services/PoliceApiService";
import { mapService } from "../services/MapService";
import styled from "styled-components";
import { IonSpinner, useIonToast } from "@ionic/react";

interface Props {
  postcode: string | null;
}

const INIT_POINT = [-1.140593, 52.740123];

export const IndexMap: React.FC<Props> = ({ postcode }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<Map | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [present] = useIonToast();

  useEffect(() => {
    if (postcode) {
      setLoading(true);
      displayBoundary(postcode);
    }
  }, [postcode]);

  const displayBoundary = async (postcodeString: string) => {
    try {
      const boundary = await policeApiService.getNHBoundary(postcodeString);
      if (map && boundary) {
        mapService.drawPolygon(map, boundary);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      present({ message: error, duration: 2000, color: "danger" });
    }
  };

  useEffect(() => {
    const initMap = new Map({
      target: mapRef.current,
      layers: [new Tile({ source: new Stamen({ layer: "toner" }) })],
      view: new View({
        center: transform(INIT_POINT, "EPSG:4326", "EPSG:3857"),
        zoom: 8,
      }),
    });
    setMap(initMap);
    setTimeout(() => initMap.updateSize(), 100);
  }, []);

  return (
    <MapContainer ref={mapRef}>
      {loading && <IonSpinner name="crescent" />}
    </MapContainer>
  );
};

const MapContainer = styled.div`
  height: 100%;
`;
