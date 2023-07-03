import { NextApiRequest, NextApiResponse } from 'next';

const handler =async (req: NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
         const token = req.headers['authorization'];
     const resFetch = await fetch('http://3.65.149.62/test-api/contacts/countries/', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application.json',
            Authorization: `Bearer ${JSON.parse(token!)}`
         }
     });
       const result = await resFetch.json();

       if (result) {
         res.status(200).json(result);
       } else {
        res.status(404).json({ message: 'No Data' });
       }
    } else (
        res.status(405).json({ message: 'Method not allowed ' })
    );
};

export default handler;