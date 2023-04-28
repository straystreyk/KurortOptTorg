import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPage, IMainPage, TPageKeys, ISocials } from "../@types/page";
import { getSocials, pageRequestConfig } from "./async";

export const fetchPageByName = createAsyncThunk(
  "pages/fetchPage",
  async (name: TPageKeys, { dispatch, getState }) => {
    if (!pageRequestConfig?.[name]) throw new Error("TI DAUN?");
    return pageRequestConfig[name]();
  }
);

export const fetchSocials = createAsyncThunk("pages/fetchSocials", getSocials);

type TInitialState = {
  main: {
    data: IPage<IMainPage> | null;
    isLoading: boolean;
    preloaded: boolean;
  };
  socials: {
    data: IPage<ISocials> | null;
    isLoading: boolean;
    preloaded: boolean;
  };
};

const initialState: TInitialState = {
  main: {
    data: null,
    isLoading: false,
    preloaded: false,
  },
  socials: {
    data: null,
    isLoading: false,
    preloaded: false,
  },
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPageData: (state, action) => {
      return { ...state, [action.payload.page]: action.payload.data };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPageByName.fulfilled, (state, action) => {
      if (!action?.meta?.arg) return state;

      return {
        ...state,
        [action.meta.arg]: {
          ...(state as any)[action.meta.arg],
          data: action.payload,
          isLoading: false,
        },
      };
    });
    builder.addCase(fetchPageByName.pending, (state, action) => {
      if (!action?.meta?.arg) return state;
      return {
        ...state,
        [action.meta.arg]: {
          ...(state as any)[action.meta.arg],
          isLoading: true,
        },
      };
    });
    builder.addCase(fetchPageByName.rejected, (state, action) => {
      if (!action?.meta?.arg) return state;

      return {
        ...state,
        [action.meta.arg]: {
          ...(state as any)[action.meta.arg],
          isLoading: false,
        },
      };
    });
    builder.addCase(fetchSocials.fulfilled, (state, action) => {
      return {
        ...state,
        socials: {
          ...state.socials,
          data: action.payload,
          isLoading: false,
        },
      };
    });
    builder.addCase(fetchSocials.pending, (state, action) => {
      return {
        ...state,
        socials: {
          ...state.socials,
          isLoading: true,
        },
      };
    });
    builder.addCase(fetchSocials.rejected, (state, action) => {
      return {
        ...state,
        socials: {
          ...state.socials,
          isLoading: false,
        },
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = pagesSlice.actions;
