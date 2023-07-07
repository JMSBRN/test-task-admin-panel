import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req:NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        if(!req.body) {
            res.status(204).end();
        } else {
            const authorization = req.headers['authorization'];
            const token = JSON.parse(authorization!);
            const id = req.body;

            const response = await fetch('http://3.65.149.62/test-api/auth/logout', {
                method: 'POST',
                headers: { 
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${JSON.parse(token!)}`
                 },
                body: JSON.stringify({ token: id })
              });
              const result = await response.json();
              
              if(result) {
                 res.status(201).end(JSON.stringify(result));       
              } else {
                res.json(result);
              }

        }
    } else {
        res.status(405).json({ message: 'Method not Allowed' });
    }

};

export default handler;