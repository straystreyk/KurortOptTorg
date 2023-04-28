import * as React from "react";

import { Layout } from "../components/layout/layout";
import { useEffect } from "react";
import { fetchPageByName } from "../store/pagesSlice";
import { useSelector, useDispatch } from "../hooks/redux";
import { Loader } from "../components/mainLoader";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, preloaded, isLoading } = useSelector(
    (state) => state.pages.main
  );

  useEffect(() => {
    if (!data && !preloaded) dispatch(fetchPageByName("main"));
  }, []);

  return (
    <Layout seo={data?.attributes?.seo}>
      {isLoading && <Loader size={100} />}
    </Layout>
  );
};
