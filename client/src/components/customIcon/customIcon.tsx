import { FC } from "react";
import { iconsConfig, TIcons } from "./iconConfig";

export const CustomIcon: FC<{ icon: TIcons }> = ({ icon }) => {
  const Component = iconsConfig?.[icon];
  return <>{Component ? <Component /> : null}</>;
};
