import { FC, ReactNode } from "react";

import classes from "@styles/layout.module.scss";
import { Header } from "./header";
import { Footer } from "./footer";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Header />
      <main className={classes.layoutMainContent}>{children}</main>
      <Footer />
    </div>
  );
};
