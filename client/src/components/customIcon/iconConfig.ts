import Logo from "../../assets/icons/logo.svg";
import WhatsApp from "../../assets/icons/whatsapp.svg";
import Telegram from "../../assets/icons/telegram.svg";
import GeoTag from "../../assets/icons/geotag.svg";
import { FC } from "react";

export type TIcons = "logo" | "geotag" | "whatsapp" | "telegram";

export const iconsConfig: { [p in TIcons]: FC } = {
  logo: Logo,
  whatsapp: WhatsApp,
  telegram: Telegram,
  geotag: GeoTag,
};
