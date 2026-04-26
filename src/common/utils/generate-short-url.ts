import crypto from "crypto";

export const generateShortUrl = (url: string) => {
  return crypto
    .createHash("sha256")
    .update(url)
    .digest("base64url")
    .slice(0, 6);
};
