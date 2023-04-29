import {
  configureStore,
  type PreloadedState,
  type StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { api } from "./api";

const reducer = {
  [api.reducerPath]: api.reducer,
};

export type TConfiguredStore = ReturnType<typeof configureStore>;

export type PreloadedStateType = PreloadedState<
  StateFromReducersMapObject<typeof reducer>
>;

export const initStore = (preloadedState?: PreloadedStateType) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
