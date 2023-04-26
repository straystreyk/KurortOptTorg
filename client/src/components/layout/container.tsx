import { FC, ReactNode } from "react";

import classes from "@styles/layout.module.scss";

export const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
