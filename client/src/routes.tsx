import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { Test } from "./components/test";
import { defaultLanguage, supportedLngs } from "./i18n";

const commonRoutes: RouteObject[] = [
  ...supportedLngs.map(
    (lng) =>
      ({
        path: lng === defaultLanguage ? "/" : `/${lng}/`,
        ...(lng === defaultLanguage ? { index: true } : {}),
        element: <Test />,
      } as RouteObject)
  ),
];

export const CommonRoutes = () => useRoutes(commonRoutes);
