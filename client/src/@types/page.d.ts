export interface IStrapiAttributes<T> {
  data: {
    attributes: T;
  };
}

interface ISeo {
  title: string;
  meta: { name: string; content: string }[];
}

interface ISocialNetworks {
  name: string;
  link: string;
  title?: string;
}

interface ISocials {
  email: string;
  phone: string;
  socialNetworks?: ISocialNetworks[];
}

interface IGoods {
  name: string;
  description?: string;
  price?: number;
  images?: [];
}

export interface IMainPage {
  seo?: ISeo;
  socials?: ISocials;
}

export type TPageKeys = "main" | "product";
