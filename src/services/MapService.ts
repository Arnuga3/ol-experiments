import Polygon from "ol/geom/Polygon";
import VectorSource from "ol/source/Vector";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { Vector } from "ol/layer";
import { Feature } from "ol";

import { Coordinate } from "../interfaces/PoliceApi";
import { extend } from "ol/array";
import { createEmpty } from "ol/extent";

const style = new Style({
  stroke: new Stroke({
    color: [255, 0, 0, 1],
    width: 6,
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
    const source = new VectorSource({
        features: [polygonFeature],
    });
    return new Vector({
        source,
        style,
    });
  }

  /**
   * @layer
   * Extent that allows the map to be zoomed to the level of the polygon boundary
   * @return extent
   */
  public getLayerExtent(layer: any) {
    if (!layer) {
        return;
    }
    // const extent = createEmpty();
    let extent: any = [];
      layer.getSource().getFeatures().forEach((feature: any) => {
        const geometry = feature.getGeometry();
        if (feature && geometry) {
          extent = [ ...extent,  geometry.getExtent()];
        }
      });
      return extent;
  }
}

export const mapService = new MapService();
