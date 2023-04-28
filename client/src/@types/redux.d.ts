import { initStore } from "../store/store";

export type Store = ReturnType<typeof initStore>;
export type StoreStateType = ReturnType<Store["getState"]>;
export type StoreDispatch = Store["dispatch"];
