import axios from "axios";
import { ENV_API_URL } from "../env";
import { TPageKeys } from "../@types/page";

export const getMainPage = async () => {
  try {
    const response = await axios.get(ENV_API_URL + `/main`, {
      params: { populate: "seo,seo.meta" },
    });

    return response.data.data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const getSocials = async () => {
  try {
    const response = await axios.get(ENV_API_URL + `/social`, {
      params: {
        populate: "socialNetworks",
      },
    });
    return response.data.data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
};

export const pageRequestConfig: {
  [p in TPageKeys]: any;
} = {
  main: getMainPage,
};
