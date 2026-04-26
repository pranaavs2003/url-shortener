import { REGEXP } from "../constants/regex.constant";

export const normalizeUrl = (url: string) => {
  if (!url) throw new Error("Invalid URL");

  const normalizedUrl = url
    .toLowerCase()
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "");

  if (REGEXP.url.test(normalizedUrl)) {
    return normalizedUrl;
  } else {
    throw new Error("Invalid URL");
  }
};
