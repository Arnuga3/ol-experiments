import React, { useState, useEffect, useRef } from "react";

import "ol/ol.css";
import { Feature, Map } from "ol";
import { Stamen } from "ol/source";
import { Tile, Vector } from "ol/layer";
import { View } from "ol";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import VectorSource from "ol/source/Vector";
import Polygon from "ol/geom/Polygon";
import { transform } from "ol/proj";
import { createEmpty, extend } from "ol/extent";

interface Props {
  boundary: { latitude: number; longitude: number }[][];
}

const MapWrapper: React.FC<Props> = ({ boundary }) => {
  const [map, setMap] = useState<any>();

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (map && boundary) {
      const polygonLayer = drawPolygonOnMap(boundary);

      const extent = createEmpty();
      polygonLayer.getSource().getFeatures().forEach((feature) => {
        const geometry = feature.getGeometry();
        if (feature && geometry) {
          extend(extent, geometry.getExtent());
        }
      })

      map.addLayer(polygonLayer);
      map.getView().fit(extent);
    }
  }, [map, boundary]);

  const style = new Style({
    stroke: new Stroke({
      color: [255, 0, 0, 1],
      width: 6,
      lineCap: "round",
    }),
  });

  const drawPolygonOnMap = (coordinates: any) => {
    const polygonFeature = new Feature(
      new Polygon([coordinates]).transform("EPSG:4326", "EPSG:3857")
    );
    let source = new VectorSource({
      features: [polygonFeature],
    });
    return new Vector({
      source,
      style,
    });
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

export default MapWrapper;
