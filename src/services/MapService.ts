import Polygon from "ol/geom/Polygon";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import { Style, Circle, Fill } from "ol/style";
import { Vector } from "ol/layer";
import { Feature, Map } from "ol";

import { isEmpty } from "ol/extent";
import { fromLonLat } from "ol/proj";

import { Coordinate } from "../interfaces/PoliceApi";

const color = [61, 194, 255, 1];
const color2 = [61, 194, 255, 0.6];

const style = new Style({
  stroke: new Stroke({
    color,
    width: 4,
    lineCap: "round",
  }),
});

export class MapService {
  public getBoundaryLayer(points: Coordinate[]) {
    const pointsTransformed = points.map((point: Coordinate) => [
      +point.longitude,
      +point.latitude,
    ]);
    const polygonFeature = new Feature(
      new Polygon([pointsTransformed]).transform("EPSG:4326", "EPSG:3857")
    );
    const source = new VectorSource({ features: [polygonFeature] });
    return new Vector({ source, style });
  }

  public getLayerExtent(layer: any) {
    return layer.getSource().getExtent();
  }

  public drawPolygon = async (map: Map, boundary: Coordinate[]) => {
    if (boundary) {
      const layer = this.getBoundaryLayer(boundary);
      const extent = this.getLayerExtent(layer);

      if (layer && extent && !isEmpty(extent)) {
        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };

  public getPointsLayer = (points: any) => {
    const source = new VectorSource({
      features: points.map(
        (point: any) =>
          new Feature({
            geometry: new Point(fromLonLat([point.longitude, point.latitude])),
          })
      ),
    });

    return new Vector({
      source,
      style: new Style({
        image: new Circle({
          radius: 3,
          stroke: new Stroke({ color: color2, width: 4, lineCap: "round" }),
          fill: new Fill({ color }),
        }),
      }),
    });
  };

  public drawPoints = async (map: Map, points: any[]) => {
    if (points) {
      const layer = this.getPointsLayer(points);
      const extent = this.getLayerExtent(layer);

      if (layer && extent && !isEmpty(extent)) {
        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };
}

export const mapService = new MapService();
