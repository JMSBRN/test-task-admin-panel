import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../components/interfaces';

const handler =async (req: NextApiRequest, res:NextApiResponse) => {
    if(req.method === 'GET') {
         const token = req.headers['authorization'];

         if(token) {
             const resFetch = await fetch('http://3.65.149.62/test-api/profile/', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application.json',
                    Authorization: `${token!}`
                 }
             });
               const result = await resFetch.json();
        
               if (result) {
                 res.status(200).json(result);
               } else {
                res.status(404).json({ message: 'No Data' });
               }
         } else {
            res.status(401).redirect('/unauthorized');
         }
         
    } else if (req.method === 'PUT') {
        if(!req.body) {
            res.status(204).end();
        } else {     
            const token = req.headers['authorization'];

            if(token) {
                const { firstName, lastName } = req.body as User;
                const resFetch = await fetch('http://3.65.149.62/test-api/profile/', {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application.json',
                        Authorization: `Bearer ${token!}`,
                        body: JSON.stringify({ firstName, lastName })
                     }
                 });
                   const result = await resFetch.json();
            
                   if (result) {
                     res.status(200).json(result);
                   } else {
                    res.status(404).json({ message: 'No Data' });
                   }
            } else {
                res.status(401).redirect('/unauthorized');
              }

            }

    } else (
        res.status(405).json({ message: 'Method not allowed ' })
    );
};

export default handler;