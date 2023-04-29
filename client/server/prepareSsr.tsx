import { initStore, TConfiguredStore } from "../src/store/store";
import { convertFromLanguageUrl } from "../src/helpers/ssr";
import { api } from "../src/store/api";

export const prepareSsr: (url: string) => Promise<TConfiguredStore> = async (
  originalUrl: string
) => {
  const store = initStore();
  const url = convertFromLanguageUrl(originalUrl);

  if (url === "/") {
    store.dispatch(
      api.endpoints.getPageDataByName.initiate({
        name: "main",
        params: { populate: "seo,seo.meta,block1" },
      })
    );
    store.dispatch(api.endpoints.getSocials.initiate());
  }

  if (url === "/price" || url === "/price/") {
    store.dispatch(api.endpoints.getSocials.initiate());
  }

  try {
    await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));
  } catch (e) {
    console.log(e.message);
  }

  return store;
};
