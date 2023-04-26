import * as React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { StoreStateType } from "../store/store";
import { Layout } from "./common/layout";
import { useTranslation } from "react-i18next";

export const Test: React.FC<{ test?: string }> = ({ test }) => {
  const count = useSelector((state: StoreStateType) => state.counter.value);
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>{test ? test + count : "React Helmet Title" + count}</title>
        <meta name="description" content="Jopa" />
        <meta name="jioap" content="asdasdas" />
      </Helmet>
      <Link to="/test">
        {t("welcome")} {test}
      </Link>
    </Layout>
  );
};
