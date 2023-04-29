import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

import classes from "@styles/customButton.module.scss";

export const CustomButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={cn(className, classes.customButton)} {...props}>
      {children}
    </button>
  );
};
