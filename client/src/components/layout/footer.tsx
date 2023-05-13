import classes from "../../styles/layout.module.scss";
import { Container } from "./container";
import { Logo } from "./header";
import { useGetSocialsQuery } from "../../store/api";
import { CustomIcon } from "../customIcon/customIcon";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../../helpers/common";

export const Footer = () => {
  const { data } = useGetSocialsQuery();

  const socials = data?.data.attributes;
  const street = socials?.socialNetworks?.find(
    (item) => item.name === "geotag"
  );

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.firstFooter}>
          <Logo />
          {socials && (
            <div className={classes.socialFooter}>
              <a
                href={`tel:${socials.phone}`}
                className={classes.footerLinkItem}
                target="_blank"
              >
                <CustomIcon icon="phone" />
                {formatPhoneNumber(socials.phone)}
              </a>
              <a
                href={`mailto:${socials.email}`}
                className={classes.footerLinkItem}
                target="_blank"
              >
                <CustomIcon icon="email" />
                {socials.email}
              </a>
              {street && (
                <a
                  target="_blank"
                  href={street.link}
                  className={classes.footerLinkItem}
                >
                  <CustomIcon icon="geotag" />
                  {street.title}
                </a>
              )}
            </div>
          )}
        </div>
      </Container>
      <div className={classes.secondFooter}>
        <Container>
          <div>
            Общество с ограниченной ответственностью «Курортоптторг» |
            Все права защищены @{new Date().getFullYear()}
          </div>
        </Container>
      </div>
    </footer>
  );
};
