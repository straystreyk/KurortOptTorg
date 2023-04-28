import { FC, ReactNode } from "react";

import classes from "@styles/layout.module.scss";
import { Header } from "./header";
import { Footer } from "./footer";
import { Helmet } from "react-helmet";
import { ISeo } from "../../@types/page";

export const Layout: FC<{
  children: ReactNode;
  seo?: ISeo;
}> = ({ children, seo }) => {
  return (
    <div className={classes.layout}>
      <Helmet>
        {seo?.meta?.map(({ name, content }, index) => (
          <meta key={name + index} name={name} content={content} />
        ))}
        <title>
          {seo?.title ? "КурортОптТорг | " + seo.title : "КурортОптТорг"}
        </title>
      </Helmet>
      <Header />
      <main className={classes.layoutMainContent}>{children}</main>
      <Footer />
    </div>
  );
};
