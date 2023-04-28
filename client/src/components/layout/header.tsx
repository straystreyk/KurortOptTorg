import { Container } from "./container";
import { CustomIcon } from "../customIcon/customIcon";
import cn from "classnames";

import classes from "@styles/layout.module.scss";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { convertFromLanguageUrl } from "../../helpers/ssr";
import { formatPhoneNumber } from "../../helpers/common";
import { TIcons } from "../customIcon/iconConfig";
import { useDispatch, useSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchPageByName, fetchSocials } from "../../store/pagesSlice";

const links = [
  {
    to: "/",
    name: "pages.main",
  },
  {
    to: "/price/",
    name: "pages.products",
  },
];

const Navigation = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const url = convertFromLanguageUrl(pathname);

  return (
    <nav>
      <ul className={classes.navigationMenu}>
        {links.map((item) => (
          <li key={item.to}>
            <Link
              className={cn(
                classes.navigationMenuLink,
                url === item.to && classes.active
              )}
              to={item.to}
            >
              {t(item.name)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Socials = () => {
  const { data, preloaded } = useSelector((state) => state.pages.socials);
  const dispatch = useDispatch();

  const socials = data?.attributes;

  useEffect(() => {
    if (!data && !preloaded) dispatch(fetchSocials());
    console.log("asd");
  }, []);

  return (
    <>
      {socials && (
        <div className={classes.headerSocials}>
          <a className={classes.headerSocialLink} href={`tel:${socials.phone}`}>
            {formatPhoneNumber("+79882812276")}
          </a>
          {socials.socialNetworks?.map((item, index) => (
            <a
              className={classes.headerSocialLink}
              target="_blank"
              href={item.link}
              key={item.name + index}
            >
              <CustomIcon icon={item.name as TIcons} />
            </a>
          ))}
        </div>
      )}
    </>
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
              КурортОптТорг
              <span>Бетон, бетонные изделия</span>
            </div>
          </div>
          <Navigation />
          <Socials />
        </div>
      </Container>
    </header>
  );
};
