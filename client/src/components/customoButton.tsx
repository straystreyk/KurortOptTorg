import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

import classes from "@styles/customButton.module.scss";

export const CustomButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { buttonType?: "outline" | "fill" }
> = ({ children, className, buttonType = "fill", ...props }) => {
  return (
    <button
      className={cn(
        className,
        cn(
          classes.customButton,
          buttonType === "outline" && classes.customButtonOutline
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};
