import { LANGUAGE_LIST } from "../lib/option";

export const getLocalesListsForStateParams = () => {
  return LANGUAGE_LIST.map((locale) => ({ locale }));
};
