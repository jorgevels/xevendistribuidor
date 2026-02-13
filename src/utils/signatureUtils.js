import CryptoJS from "crypto-js";

export const generateSignature = (data, secret) => {
  const hash = CryptoJS.HmacSHA256(data, secret);
  return hash.toString(CryptoJS.enc.Hex);
};
