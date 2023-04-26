import React from "react";
import { FC, ReactNode } from "react";

import classes from "../../styles/common/layout.module.scss";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <header>header</header>
      <main className={classes.layoutMainContent}>{children}</main>
      <footer>footer</footer>
    </div>
  );
};
