import { StoreStateType } from "./store/store";

declare global {
  var _SSR_STORE_STATE_: StoreStateType;
  var initialI18nStore: any;
  var initialLanguage: any;
  var _GLOBALS_: {
    TEST: string;
    API_URL: string;
    CLIENT_URL: string;
  };
}
