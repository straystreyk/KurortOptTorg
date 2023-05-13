import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from "@reduxjs/toolkit/query/react";
import { ENV_API_URL } from "../env";
import { IGoods, ISocials, IStrapiAttributes, TPageKeys } from "../@types/page";

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ENV_API_URL }),
  endpoints: (builder) => ({
    getPageDataByName: builder.query<
      any,
      { name: TPageKeys; params?: Record<string, string> }
    >({
      query: ({ name, params }) => ({
        url: `/${name}`,
        params: params ?? {},
      }),
    }),
    getSocials: builder.query<IStrapiAttributes<ISocials>, void>({
      query: () => ({
        url: "/social",
        params: {
          populate: "socialNetworks",
        },
      }),
    }),
    getGoods: builder.query<
      { data: { attributes: IGoods; id: number }[] },
      { params?: Record<string, string> }
    >({
      query: ({ params }) => ({
        url: "/commodities",
        params: params ?? {},
      }),
    }),
  }),
});

export const {
  useGetPageDataByNameQuery,
  useGetSocialsQuery,
  useGetGoodsQuery,
} = api;
