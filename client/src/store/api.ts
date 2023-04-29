import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from "@reduxjs/toolkit/query/react";
import { ENV_API_URL } from "../env";

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: ENV_API_URL }),
  endpoints: (builder) => ({
    getPageDataByName: builder.query<any, string>({
      query: (name) => ({
        url: `/${name}`,
        params: {
          populate: "seo,seo.meta",
        },
      }),
    }),
    getSocials: builder.query<any, void>({
      query: () => ({
        url: "/social",
        params: {
          populate: "socialNetworks",
        },
      }),
    }),
  }),
});

export const { useGetPageDataByNameQuery, useGetSocialsQuery } = api;
