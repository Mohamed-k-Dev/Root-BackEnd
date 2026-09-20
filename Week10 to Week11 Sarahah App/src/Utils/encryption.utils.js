import CryptoJS from "crypto-js";

export const encrypt = (text , key) => {
  const encryptedData = CryptoJS.AES.encrypt(text, key).toString();
  return encryptedData;
};

export const decrypt = (text , key) => {
  const data = CryptoJS.AES.decrypt(text, key);
  const decryptedData = data.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};
