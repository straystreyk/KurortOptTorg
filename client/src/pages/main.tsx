import * as React from "react";

import { Layout } from "../components/layout/layout";
import { useGetPageDataByNameQuery, useGetSocialsQuery } from "../store/api";
import { Loader } from "../components/mainLoader";
import { Block } from "../components/layout/block";
import { Container } from "../components/layout/container";

import classes from "@styles/pages/main.module.scss";
import { CustomButton } from "../components/customoButton";
import cn from "classnames";
import { useState } from "react";
import { Popup } from "../components/popup";
import { CustomIcon } from "../components/customIcon/customIcon";
import { TIcons } from "../components/customIcon/iconConfig";
import { formatPhoneNumber } from "../helpers/common";
import { MarkdownText } from "../components/markdownText";

const ContactsPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { data } = useGetSocialsQuery();

  const socials = data?.data.attributes;

  const handleClose = () => setShowPopup(false);
  const handleOpen = () => setShowPopup(true);

  return (
    <>
      <CustomButton onClick={handleOpen}>Связаться с нами</CustomButton>
      <Popup
        title="Контакты для связи"
        description="Свяжитесь с нами любым удобным способом, мы всегда на связи!"
        show={showPopup}
        handleClose={handleClose}
        className={classes.mainContactsPopup}
      >
        {socials && (
          <div className={classes.mainContactsContent}>
            <a href={`tel:${socials.phone}`}>
              <CustomButton
                className={classes.mainContactBtn}
                buttonType="outline"
              >
                {formatPhoneNumber(socials?.phone)} <CustomIcon icon="phone" />
              </CustomButton>
            </a>
            <a href={`mailto:${socials.email}`}>
              <CustomButton
                className={classes.mainContactBtn}
                buttonType="outline"
              >
                {socials?.email} <CustomIcon icon="email" />
              </CustomButton>
            </a>
            {socials?.socialNetworks?.map((item, index) => {
              const name = item.name === "geotag" ? "yandex карты" : item.name;
              return (
                <a key={item.link + index} target="_blank" href={item.link}>
                  <CustomButton
                    className={classes.mainContactBtn}
                    buttonType="outline"
                  >
                    {name.substring(1, 0).toUpperCase() + name.substring(1)}
                    <CustomIcon icon={item.name as TIcons} />
                  </CustomButton>
                </a>
              );
            })}
          </div>
        )}
      </Popup>
    </>
  );
};

export const MainPage: React.FC = () => {
  const { data, isLoading } = useGetPageDataByNameQuery({
    name: "main",
    params: { populate: "seo,seo.meta,block1" },
  });
  const seo = data?.data?.attributes?.seo;
  const block1 = data?.data?.attributes?.block1;

  return (
    <Layout seo={seo}>
      {isLoading && <Loader size={100} />}
      {!isLoading && data && (
        <>
          {block1 && (
            <Container>
              <Block className={classes.mainBlock1}>
                <div className={classes.mainBlock1Left}>
                  {block1.title && <h1>{block1.title}</h1>}
                  {block1.description && (
                    <div
                      className={cn(classes.mainBlock1Description, "custom-t1")}
                    >
                      <MarkdownText text={block1.description} />
                    </div>
                  )}
                  <ContactsPopup />
                </div>
              </Block>
            </Container>
          )}
        </>
      )}
    </Layout>
  );
};
