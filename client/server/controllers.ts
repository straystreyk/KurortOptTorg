import { getMainPage, getSocials } from "../src/store/async";
import { StoreStateType } from "../src/@types/redux";

export const mainPagerController = async (state: StoreStateType) => {
  try {
    const socials = await getSocials();
    const main = await getMainPage();
    state.pages = {
      ...state.pages,
      main: {
        ...state.pages.main,
        preloaded: true,
        data: main || null,
      },
      socials: {
        ...state.pages.socials,
        preloaded: true,
        data: socials || null,
      },
    };
  } catch (e) {
    console.log(e.message);
    state.pages.main = {
      ...state.pages.main,
      preloaded: false,
      data: null,
    };
  }
};
