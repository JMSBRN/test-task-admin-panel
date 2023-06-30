import { NextApiRequest, NextApiResponse } from 'next';
import { getDecryptedDataFromCookie, setEncryptedDataToCookie } from './secureCookiesUtils';

const getContactInfo = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
  const token = getDecryptedDataFromCookie('token');
  
  const fetchRes = await fetch('/api/contacts/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, token }),
  });

  const result = await fetchRes.json();

  if (result.message === 'Unauthorized') {
    
    const refreshToken = getDecryptedDataFromCookie('refreshToken');

     const fetchRes = await fetch('http://3.65.149.62/test-api/auth/refresh-tokens', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ token: JSON.parse(refreshToken!) })

     });
     const result = await fetchRes.json();

     if (result.accessToken) {
      setEncryptedDataToCookie('token', result.accessToken, req, res);
     }
  }
  
  if (result) {
    return result;
  } else {
    return null;
  }
};

export default getContactInfo;
