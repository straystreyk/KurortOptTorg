import { initStore, TConfiguredStore } from "../src/store/store";
import { convertFromLanguageUrl } from "../src/helpers/ssr";
import { api } from "../src/store/api";

export const prepareSsr: (url: string) => Promise<TConfiguredStore> = async (
  originalUrl: string
) => {
  const store = initStore();
  const url = convertFromLanguageUrl(originalUrl);

  if (url === "/") {
    store.dispatch(api.endpoints.getPageDataByName.initiate("main"));
    store.dispatch(api.endpoints.getSocials.initiate());
  }

  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));

  return store;
};
