import { NextApiRequest, NextApiResponse } from 'next';
import { setEncryptedDataToCookie } from '../../utils/secureCookiesUtils';

const handler = async (req:NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        if(!req.body) {
            res.status(204).end();
        } else {
            const { formData } = req.body;
            const response = await fetch('http://3.65.149.62/test-api/auth/login/', {
                method: 'POST',
                headers: { 
                    'Content-Type':'application/json'
                 },
                body: JSON.stringify(formData)
              });
              const result = await response.json();

               console.log(result);
              if(result.accessToken) {
                 const { accessToken } = result;
                 
                 setEncryptedDataToCookie('token', accessToken, req, res);
                 res.status(201).end(JSON.stringify({ message: 'created' }));       
              } else {
                res.json(result);
              }

        }
    } else {
        res.status(405).json({ message: 'Method not Allowed' });
    }

};

export default handler;