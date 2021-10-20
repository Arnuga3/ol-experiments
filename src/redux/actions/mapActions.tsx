export enum MapActions {
  STORE_MAP_POSITION = "STORE_MAP_POSITION",
}

export interface StoreMapPosition {
  type: MapActions.STORE_MAP_POSITION;
  corners: any,
}

export const storeMapPosition = (
  corners: any,
): StoreMapPosition => ({
  type: MapActions.STORE_MAP_POSITION,
  corners,
});
