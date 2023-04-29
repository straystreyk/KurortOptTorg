import * as React from "react";

import { Layout } from "../components/layout/layout";
import { useGetPageDataByNameQuery } from "../store/api";
import { Loader } from "../components/mainLoader";

export const MainPage: React.FC = () => {
  const { data, isLoading } = useGetPageDataByNameQuery("main");

  return <Layout>{isLoading && <Loader size={100} />}</Layout>;
};
