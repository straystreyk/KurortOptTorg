export interface IPage<T> {
  attributes: T;
}

interface ISeo {
  title: string;
  meta: { name: string; content: string }[];
}

interface ISocialNetworks {
  name: string;
  link: string;
}

interface ISocials {
  email: string;
  phone: string;
  socialNetworks?: ISocialNetworks[];
}

export interface IMainPage {
  seo?: ISeo;
  socials?: ISocials;
}

export type TPageKeys = "main";
