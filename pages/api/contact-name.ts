import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method === 'POST') {
  
      const authorization = req.headers['authorization'];
       const { token, id } = JSON.parse(authorization!);
       const response = await fetch(
         `http://3.65.149.62/test-api/contacts/${id}/open`,
         {
           method: 'POST',
           headers:  {
            Accept: '*/*',
            Authorization: `Bearer ${JSON.parse(token)}`,
          }
         }
       );
   
       const result = await response.text();
   
       if (result) {
         res.status(200).json(result);
       } else {
         res.status(404).json({ message: 'No Data' });
       }
  } else {
    res.status(405).json({ message: 'method not allowed' });
  }
};

export default handler;
