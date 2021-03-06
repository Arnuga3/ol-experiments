import { Map, View, Feature } from "ol";
import { Point, Polygon } from "ol/geom";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { Heatmap, Vector, Tile } from "ol/layer";
import { Stamen } from "ol/source";
import { defaults } from "ol/control";
import { fromLonLat, transform, transformExtent } from "ol/proj";
import {
  getBottomLeft,
  getBottomRight,
  getTopLeft,
  getTopRight,
  isEmpty,
} from "ol/extent";
import { GeoJSON } from "ol/format";

import VectorSource from "ol/source/Vector";
import "ol/ol.css";

import { Coordinate } from "../interfaces/PoliceApi";

import pin from "../data/pin.png";

const color = getComputedStyle(document.documentElement).getPropertyValue(
  "--ion-color-secondary"
);

const INIT_POINT = [-1.8, 53.6];
const DRAWING_LAYER = "DRAWING_LAYER";

function getStyles(options: any = null) {
  return new Style({
    stroke: getStroke(options?.stroke),
    fill: getFill(options?.fill),
  });
}

function getStroke(options: any) {
  const strokeOptions = {
    color,
    width: 3,
    lineCap: "round",
    ...(options ? options : {}),
  };
  return new Stroke(strokeOptions);
}

function getFill(options: any) {
  const fillOptions = {
    color: [0, 0, 0, 0.05],
    ...(options ? options : {}),
  };
  return new Fill(fillOptions);
}

interface ShapeCorners {
  tl: number;
  tr: number;
  bl: number;
  br: number;
}

export class MapService {
  public initMap(target: any) {
    return new Map({
      controls: defaults({
        attribution: false,
        zoom: false,
      }),
      target,
      layers: [new Tile({ source: new Stamen({ layer: "toner" }) })],
      view: new View({
        center: transform(INIT_POINT, "EPSG:4326", "EPSG:3857"),
        zoom: 6,
      }),
    });
  }

  // public trackMapPosition(map: Map, dispatch: Dispatch) {
  //   map.on("moveend", (e) => {
  //     dispatch(
  //       storeMapPosition(
  //         map.getView().getZoom() as any,
  //         map.getView().getCenter() as any
  //       )
  //     );
  //   });
  // }

  public updateMapPosition(map: Map, zoom: number, center: number[]) {
    map.getView().setZoom(zoom);
    map.getView().setCenter(center);
  }

  public createBoundaryLayerFromCoordinates(points: Coordinate[], styles: any) {
    const pointsTransformed = points.map((point: Coordinate) => [
      +point.longitude,
      +point.latitude,
    ]);
    const polygonFeature = new Feature(
      new Polygon([pointsTransformed]).transform("EPSG:4326", "EPSG:3857")
    );
    const source = new VectorSource({ features: [polygonFeature] });
    const layer = new Vector({ source, style: getStyles(styles) });
    layer.set("name", DRAWING_LAYER);
    return layer;
  }

  public drawBoundaryFromCoordinates = (
    map: Map,
    boundary: Coordinate[],
    fitToExtent = true,
    styles: any = null
  ) => {
    const layer = this.createBoundaryLayerFromCoordinates(boundary, styles);
    map.addLayer(layer);

    if (fitToExtent) {
      this.fitToExtent(map, layer);

      const area = layer.getSource().getExtent();
      const zoom = map.getView().getZoom();

      if (zoom && zoom >= 14) {
        return this.getCorners(area);
      }

      if (zoom && zoom >= 12) {
        return this.getCorners(area, 2);
      }

      if (zoom && zoom >= 10) {
        return this.getCorners(area, 3);
      }

      if (zoom && zoom >= 8) {
        return this.getCorners(area, 4);
      }

      return this.getCorners(area, 5);
    }
  };

  public createBoundaryLayerFromGeoJson(boundary: any, styles: any) {
    const source = new VectorSource({
      features: new GeoJSON().readFeatures(boundary).map((f) => {
        f.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return f;
      }),
    });
    const layer = new Vector({ source, style: getStyles(styles) });
    layer.set("name", DRAWING_LAYER);
    return layer;
  }

  public drawBoundaryFromGeoJson = (
    map: Map,
    boundary: any,
    fitToExtent = true,
    styles: any = null
  ) => {
    const layer = this.createBoundaryLayerFromGeoJson(boundary, styles);
    map.addLayer(layer);
    if (fitToExtent) {
      this.fitToExtent(map, layer);
    }
  };

  public drawPin = (map: Map, coordinates: Coordinate) => {
    const layer = this.pinLayer(coordinates);
    map.addLayer(layer);
  };

  public fitToExtent(map: Map, layer: any) {
    setTimeout(() => {
      const extent = layer.getSource().getExtent();
      if (layer && extent && !isEmpty(extent)) {
        map.getView().fit(extent);
      }
    }, 100);
  }

  // TODO - time to create a service and write tests using TDD approach

  public getCorners(extent: any, chunks = 1) {
    const x = transformExtent(extent, "EPSG:3857", "EPSG:4326");

    const shape: ShapeCorners = {
      tl: +getTopLeft(x),
      tr: +getTopRight(x),
      bl: +getBottomLeft(x),
      br: +getBottomRight(x),
    };

    switch (chunks) {
      case 1:
        return shape;

      case 2:
        return this.splitOnHalf(shape);

      case 3:
        return this.splitOnQuarters(shape);
    }

    return {
      topLeft: getTopLeft(x),
      topRight: getTopRight(x),
      bottomLeft: getBottomLeft(x),
      bottomRight: getBottomRight(x),
    };
  }

  public splitOnHalf(shape: ShapeCorners) {
    const { tl, tr, bl, br } = shape;

    const leftMiddlePoint = (bl - tl) / 2;
    const rightMiddlePoint = (br - tr) / 2;

    const area1 = {
      ...shape,
      bl: leftMiddlePoint,
      br: rightMiddlePoint,
    };

    const area2 = {
      ...shape,
      tl: leftMiddlePoint,
      tr: rightMiddlePoint,
    };

    return [area1, area2];
  }

  public splitOnQuarters(shape: ShapeCorners) {
    const halfs = this.splitOnHalf(shape);

    return [...this.splitOnHalf(halfs[0]), ...this.splitOnHalf(halfs[1])];
  }

  public clear(map: Map) {
    map.getLayers().forEach((layer) => {
      if (layer && layer.get("name") && layer.get("name") === DRAWING_LAYER) {
        map.removeLayer(layer);
      }
    });
  }

  public pinLayer = (coordinate: Coordinate) => {
    const pinFeature = new Feature({
      geometry: new Point(
        fromLonLat([+coordinate.longitude, +coordinate.latitude])
      ),
    });

    const source = new VectorSource({
      features: [pinFeature],
    });
    return new Vector({
      source,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 32],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: pin,
        }),
      }),
    });
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
    return new Heatmap({ source });
  };

  public drawPoints = async (map: Map, points: any[], fitToExtent = true) => {
    if (points) {
      const layer = this.getPointsLayer(points);
      map.addLayer(layer);
      if (fitToExtent) {
        this.fitToExtent(map, layer);
      }
    }
  };
}

export const mapService = new MapService();
