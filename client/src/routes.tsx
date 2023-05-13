import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { defaultLanguage, supportedLngs } from "./i18n";
import { MainPage } from "./pages/main";
import { Products } from "./pages/products";

const commonRoutes: RouteObject[] = [
  ...supportedLngs.map(
    (lng) =>
      ({
        path: lng === defaultLanguage ? "/" : `/${lng}/`,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "products",
            element: <Products />,
          },
        ],
      } as RouteObject)
  ),
];

export const CommonRoutes = () => useRoutes(commonRoutes);
