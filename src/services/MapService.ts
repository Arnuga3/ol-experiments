import Polygon from "ol/geom/Polygon";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { Vector } from "ol/layer";
import { Feature, Map } from "ol";

import { extend } from "ol/array";
import { isEmpty } from "ol/extent";

import { Coordinate } from "../interfaces/PoliceApi";

const style = new Style({
  stroke: new Stroke({
    color: [61, 194, 255, 1],
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

  /**
   * @layer
   * Extent that allows the map to be zoomed to the level of the polygon boundary
   * @return extent
   */
  public getLayerExtent(layer: any) {
    let extent: any = null;

    layer
      .getSource()
      .getFeatures()
      .forEach((feature: any) => {
        const geometry = feature.getGeometry();
        if (geometry) {
          extent = extent
            ? extend(extent, geometry.getExtent())
            : geometry.getExtent();
        }
      });
    return extent;
  }

  drawPolygon = async (map: Map, boundary: Coordinate[]) => {
    if (boundary) {
      const layer = this.getBoundaryLayer(boundary);
      const extent = this.getLayerExtent(layer);

      if (layer && extent && !isEmpty(extent)) {
        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };
}

export const mapService = new MapService();
