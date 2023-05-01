import { Container } from "./container";
import { CustomIcon } from "../customIcon/customIcon";
import cn from "classnames";

import classes from "@styles/layout.module.scss";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { convertFromLanguageUrl } from "../../helpers/ssr";
import { formatPhoneNumber } from "../../helpers/common";
import { TIcons } from "../customIcon/iconConfig";
import { useGetSocialsQuery } from "../../store/api";
import { PortalTooltip } from "../portalTooltip";

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

export const Logo = () => (
  <div className={classes.headerLogo}>
    <CustomIcon icon="logo" />
    <div className={classes.headerLogoName}>
      КурортОптТорг
      <span>Бетон, бетонные изделия</span>
    </div>
  </div>
);

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
  const { data } = useGetSocialsQuery();
  const socials = data?.data?.attributes;

  return (
    <>
      {socials && (
        <div className={classes.headerSocials}>
          <PortalTooltip
            placement="bottom-middle"
            tooltipContent="Контактный телефон"
          >
            <a
              className={classes.headerSocialLink}
              href={`tel:${socials.phone}`}
            >
              {formatPhoneNumber(socials.phone)}
            </a>
          </PortalTooltip>
          <PortalTooltip
            placement="bottom-middle"
            tooltipContent="Контактная почта"
          >
            <a
              className={classes.headerSocialLink}
              href={`mailto:${socials.email}`}
            >
              <CustomIcon icon="email" />
            </a>
          </PortalTooltip>
          {socials?.socialNetworks?.map((item, index) => {
            const name = item.name === "geotag" ? "Yandex карты" : item.name;

            return (
              <PortalTooltip
                key={name + index}
                placement="bottom-middle"
                tooltipContent={name[0].toUpperCase() + name.substring(1)}
              >
                <a
                  className={classes.headerSocialLink}
                  target="_blank"
                  href={item.link}
                >
                  <CustomIcon icon={item.name as TIcons} />
                </a>
              </PortalTooltip>
            );
          })}
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
          <Logo />
          <Navigation />
          <Socials />
        </div>
      </Container>
    </header>
  );
};
