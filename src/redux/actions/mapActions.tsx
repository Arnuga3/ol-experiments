export enum MapActions {
  STORE_MAP_POSITION = "STORE_MAP_POSITION",
}

export interface StoreMapPosition {
  type: MapActions.STORE_MAP_POSITION;
  zoom: number,
  center: number[],
}

export const storeMapPosition = (
  zoom: number,
  center: number[],
): StoreMapPosition => ({
  type: MapActions.STORE_MAP_POSITION,
  zoom,
  center,
});
