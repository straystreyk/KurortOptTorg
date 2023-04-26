import { Container } from "./container";
import { CustomIcon } from "../customIcon/customIcon";
import cn from "classnames";

import classes from "@styles/layout.module.scss";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { convertFromLanguageUrl } from "../../helpers/ssr";

const links = [
  {
    to: "/",
    name: "pages.main",
  },
  {
    to: "/price/",
    name: "pages.price",
  },
];

const Navigation = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const languageUrl = convertFromLanguageUrl(pathname);

  return (
    <nav>
      <ul className={classes.navigationMenu}>
        {links.map((item) => (
          <li key={item.to}>
            <a
              className={cn(
                classes.navigationMenuLink,
                languageUrl === item.to && classes.active
              )}
              href={item.to}
            >
              {t(item.name)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <header className={classes.header}>
      <Container>
        <div className={classes.headerContent}>
          <div className={classes.headerLogo}>
            <CustomIcon icon="logo" />
            <div className={classes.headerLogoName}>
              АрмСтрой
              <span>ООО КурортОптТорг</span>
            </div>
          </div>
          <Navigation />
        </div>
      </Container>
    </header>
  );
};
