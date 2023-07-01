import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie } from 'cookies-next';
import crypto from 'crypto-js';

const secretKey = process.env.LOCAL_SECRET;

const setEncryptedDataToCookie = (
  key: string,
  data: string,
  req?: NextApiRequest,
  res?: NextApiResponse
) => {
  const encryptedData = crypto.AES.encrypt(
    JSON.stringify(data),
    secretKey!
  ).toString();

  setCookie(key, encryptedData, { req, res });
};

const getDecryptedDataFromCookie = (key: string) => {
  const encryptedData = getCookie(key) as string;

  if (encryptedData) {
    const decryptedData = crypto.AES.decrypt(
      encryptedData!,
      secretKey!
    ).toString(crypto.enc.Utf8);

    return decryptedData;
  } else {
    return null;
  }
};

export { setEncryptedDataToCookie, getDecryptedDataFromCookie };
