import { Layout } from "../components/layout/layout";
import { Container } from "../components/layout/container";

import classes from "@styles/pages/products.module.scss";
import { useGetGoodsQuery, useGetPageDataByNameQuery } from "../store/api";
import { Loader } from "../components/mainLoader";
import * as React from "react";
import { Block } from "../components/layout/block";
import { MarkdownText } from "../components/markdownText";
import { FC } from "react";

const Goods: FC = () => {
  const { data, isLoading, isError } = useGetGoodsQuery({
    params: { populate: "images", sort: "price:asc" },
  });

  const goods = data?.data;

  return (
    <div className={classes.goods}>
      {goods?.map((item) => (
        <div className={classes.goodItem} key={item.id}>
          <div className={classes.goodItemTitle}>{item.attributes.name}</div>
          <div className={classes.goodItemTitle}>
            {item.attributes.price} руб.
          </div>
        </div>
      ))}
    </div>
  );
};

export const Products = () => {
  const { data, isLoading, isError } = useGetPageDataByNameQuery({
    name: "product",
    params: { populate: "seo.meta,block1,block2" },
  });

  const seo = data?.data?.attributes?.seo;
  const block1 = data?.data?.attributes?.block1;
  const block2 = data?.data?.attributes?.block2;

  if (isError) return <Layout>Error</Layout>;

  return (
    <Layout seo={seo}>
      {isLoading && <Loader size={100} />}
      <Container>
        {block1 && (
          <Block className={classes.productBlock1}>
            {block1?.title && <h1>{block1.title}</h1>}
            {block1?.description && <MarkdownText text={block1.description} />}
          </Block>
        )}
        {block2 && (
          <Block className={classes.productBlock2}>
            {block2?.title && <h2>{block2.title}</h2>}
            {block2?.description && <MarkdownText text={block2.description} />}
          </Block>
        )}
      </Container>
      <Container>
        <Goods />
      </Container>
    </Layout>
  );
};
