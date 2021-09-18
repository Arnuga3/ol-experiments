import React, { useState, useEffect, useRef } from "react";

import "ol/ol.css";
import { Map, View } from "ol";
import { Stamen } from "ol/source";
import { Tile } from "ol/layer";
import { transform } from "ol/proj";

import { mapService } from "../services/MapService";
import { postcodeApiService } from "../services/PostcodeApiService";
import { policeApiService } from "../services/PoliceApiService";

interface Props {
  search: string | null;
}

const IndexMap: React.FC<Props> = ({ search }) => {
  const [map, setMap] = useState<any>();

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (search) {
      drawBoundaryLayer(search);
    }
  }, [search]);

  const drawBoundaryLayer = async (postcode: string) => {

    const coordinates = await postcodeApiService.getPostcodeCoordinates(
      postcode.replace(/\s/g, "")
    );

    if (coordinates) {
      const { latitude, longitude } = coordinates;

      const neighbourhoodBoundary =
        await policeApiService.getNeighbourhoodBoundaryByCoordinates(
          latitude,
          longitude
        );

      if (neighbourhoodBoundary) {
        const layer = mapService.getBoundaryLayer(neighbourhoodBoundary);
        const extent = await mapService.getLayerExtent(layer);

        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new Tile({
          source: new Stamen({
            layer: "toner",
          }),
        }),
      ],
      view: new View({
        center: transform([-1.140593, 52.740123], "EPSG:4326", "EPSG:3857"),
        zoom: 8,
      }),
    });

    setMap(initialMap);

    setTimeout(() => {
      initialMap.updateSize();
    }, 100);
  }, []);

  return <div style={{ height: "100%" }} ref={mapRef} />;
};

export default IndexMap;
