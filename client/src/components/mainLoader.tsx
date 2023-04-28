import classes from "../styles/mainLoader.module.scss";
import { FC } from "react";

export const Loader: FC<{ size: number }> = ({ size }) => {
  return (
    <div className={classes.loaderWrapper}>
      <div
        style={{ width: size, height: size, borderWidth: size / 10 }}
        className={classes.loader}
      />
    </div>
  );
};
