export enum LoaderActions {
  LOADING_START = "LOADING_START",
  LOADING_STOP = "LOADING_STOP",
}

export interface LoadingStart {
  type: LoaderActions.LOADING_START;
}

export interface LoadingStop {
  type: LoaderActions.LOADING_STOP;
}

export const loadingStart = (): LoadingStart => ({
  type: LoaderActions.LOADING_START,
});

export const loadingStop = (): LoadingStop => ({
  type: LoaderActions.LOADING_STOP,
});
