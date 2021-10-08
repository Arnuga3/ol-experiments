import { Map, View, Feature } from "ol";
import { Point, Polygon } from "ol/geom";
import { Style, Circle, Fill, Stroke } from "ol/style";
import { Heatmap, Vector, Tile } from "ol/layer";
import { Stamen } from "ol/source";
import { defaults } from "ol/control";
import { fromLonLat, transform } from "ol/proj";
import { isEmpty } from "ol/extent";
import { GeoJSON, KML } from "ol/format";

import VectorSource from "ol/source/Vector";
import "ol/ol.css";

import { Coordinate } from "../interfaces/PoliceApi";
import { Dispatch } from "redux";
import { storeMapPosition } from "../redux/actions/mapActions";

import gj from "./../data/bedfordshire.json";

const color = [61, 194, 255, 1];

const style = new Style({
  stroke: new Stroke({
    color,
    width: 4,
    lineCap: "round",
  }),
});

const INIT_POINT = [-1.140593, 52.740123];
const POLYGON_LAYER = "POLYGON_LAYER";

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
        zoom: 8,
      }),
    });
  }
  public trackMapPosition(map: Map, dispatch: Dispatch) {
    map.on("moveend", (e) => {
      dispatch(
        storeMapPosition(
          map.getView().getZoom() as any,
          map.getView().getCenter() as any
        )
      );
    });
  }
  public updateMapPosition(map: Map, zoom: number, center: number[]) {
    map.getView().setZoom(zoom);
    map.getView().setCenter(center);
  }
  public createBoundaryLayer(points: Coordinate[]) {
    const pointsTransformed = points.map((point: Coordinate) => [
      +point.longitude,
      +point.latitude,
    ]);
    const polygonFeature = new Feature(
      new Polygon([pointsTransformed]).transform("EPSG:4326", "EPSG:3857")
    );
    const source = new VectorSource({ features: [polygonFeature] });
    const layer = new Vector({ source, style });
    layer.set("name", POLYGON_LAYER);

    return layer;
  }

  public async createGEOJSONBoundaryLayer(force: string) {
    const data = await import(`./../data/force-boundaries/${force}.json`);

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(data).map((f) => {
        f.getGeometry().transform("EPSG:4326", "EPSG:3857");
        return f;
      }),
    });

    const layer = new Vector({ source, style });
    layer.set("name", POLYGON_LAYER);

    return layer;
  }

  public getLayerExtent(layer: any) {
    return layer.getSource().getExtent();
  }

  public drawBoundary = async (map: Map, boundary: Coordinate[]) => {
    if (boundary) {
      this.removeBoundaryLayer(map); // Clear previous layer

      const layer = this.createBoundaryLayer(boundary);
      const extent = this.getLayerExtent(layer);

      if (layer && extent && !isEmpty(extent)) {
        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };

  public drawGEOJSONBoundary = async (map: Map, force: string) => {
    if (force) {
      this.removeBoundaryLayer(map); // Clear previous layer

      const layer = await this.createGEOJSONBoundaryLayer(force);
      const extent = this.getLayerExtent(layer);

      if (layer && extent && !isEmpty(extent)) {
        map.addLayer(layer);
        map.getView().fit(extent);
      }
    }
  };

  public removeBoundaryLayer(map: Map) {
    map.getLayers().forEach((layer) => {
      if (layer.get("name") && layer.get("name") === POLYGON_LAYER) {
        map.removeLayer(layer);
      }
    });
  }

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
