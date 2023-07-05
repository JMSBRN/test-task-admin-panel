import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const authorization = req.headers['authorization'];
   const { id, token } = JSON.parse(authorization!);
    const resFetch = await fetch(
      `http://3.65.149.62/test-api/contacts/${id}/open`
    ,{
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
             Authorization: `Bearer ${token}`
        }
    });
    const result = await resFetch.json();

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
