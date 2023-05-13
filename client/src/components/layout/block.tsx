import { FC, ReactNode } from "react";
import cn from "classnames";

import classes from "../../styles/layout.module.scss";

export const Block: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => {
  return <section className={cn(className, classes.block)}>{children}</section>;
};
