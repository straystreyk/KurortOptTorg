import { PreloadedStateType } from "./store/store";

declare global {
  var _SSR_STORE_STATE_: PreloadedStateType | undefined;
  var initialI18nStore: any | undefined;
  var initialLanguage: any | undefined;
}
