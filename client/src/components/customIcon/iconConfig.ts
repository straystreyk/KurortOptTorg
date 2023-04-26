import Logo from "../../assets/icons/logo.svg";
import { FC } from "react";

export type TIcons = "logo";

export const iconsConfig: { [p in TIcons]: FC } = {
  logo: Logo,
};
