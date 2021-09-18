import { Map } from "ol";
import { policeApiService } from "../services/PoliceApiService";
import { postcodeApiService } from "../services/PostcodeApiService";

export class MapManager {
    private map: Map;
    constructor(map: Map) {
        this.map = map;
    }

    set(map: Map) {
        this.map = map;
    }

    get(): Map {
        return this.map;
    }

    public drawPolygon = async (postcode: string) => {

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
}