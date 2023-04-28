import {
  combineReducers,
  configureStore,
  type PreloadedState,
  type StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { pagesSlice } from "./pagesSlice";

const reducer = {
  [pagesSlice.name]: pagesSlice.reducer,
};

export type PreloadedStateType = PreloadedState<
  StateFromReducersMapObject<typeof reducer>
>;

export const initStore = (preloadedState?: PreloadedStateType) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });
