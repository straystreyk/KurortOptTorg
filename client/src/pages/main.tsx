import * as React from "react";

import { Layout } from "../components/layout/layout";
import { useGetPageDataByNameQuery } from "../store/api";
import { Loader } from "../components/mainLoader";
import { Block } from "../components/layout/block";
import { Container } from "../components/layout/container";

import classes from "@styles/pages/main.module.scss";
import { CustomButton } from "../components/customoButton";

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
                    <div className={classes.mainBlock1Description}>
                      {block1.description}
                    </div>
                  )}
                  <CustomButton>Связаться с нами</CustomButton>
                </div>
              </Block>
            </Container>
          )}
        </>
      )}
    </Layout>
  );
};
