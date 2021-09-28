import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "ol/ol.css";
import { Map as OLMap, View } from "ol";
import { OSM, Stamen } from "ol/source";
import { Tile } from "ol/layer";
import { transform } from "ol/proj";

import { policeApiService } from "../../../services/PoliceApiService";
import { mapService } from "../../../services/MapService";

import { useIonToast } from "@ionic/react";
import { defaults } from "ol/control";
import TileLayer from "ol/layer/Tile";

interface Props {
  postcode: string | null;
  onLoading: (loading: boolean) => void;
  onData: (data: any) => void;
}

const INIT_POINT = [-1.140593, 52.740123];

export const Map: React.FC<Props> = ({ postcode, onLoading, onData }) => {
  const mapRef = useRef<any>(null);
  const [map, setMap] = useState<OLMap | null>(null);

  const [present] = useIonToast();

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

  useEffect(() => {
    const initMap = new OLMap({
      controls: defaults({
        attribution: false,
        zoom: false,
      }),
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: "toner",
          }),
        }),
      ],
      view: new View({
        center: transform(INIT_POINT, "EPSG:4326", "EPSG:3857"),
        zoom: 8,
      }),
    });
    setMap(initMap);
    setTimeout(() => {
      initMap.updateSize();
    }, 100);
  }, []);

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 100%;
  filter: invert(100%);
`;
