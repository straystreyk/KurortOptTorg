import { initStore } from "../src/store/store";
import { convertFromLanguageUrl } from "../src/helpers/ssr";
import { StoreStateType } from "../src/@types/redux";
import { mainPagerController } from "./controllers";

export const prepareSsr: (url: string) => Promise<StoreStateType> = async (
  originalUrl: string
) => {
  const store = initStore();
  const state: StoreStateType = JSON.parse(JSON.stringify(store.getState()));
  const url = convertFromLanguageUrl(originalUrl);

  if (url === "/") await mainPagerController(state);
  if (url === "/price" || url === "/price/") {
  }

  return state;
};
