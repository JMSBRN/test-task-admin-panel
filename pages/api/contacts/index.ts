import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const token = process.env.API_TOKEN;

    if (!req.body) {
      res.status(204).end();
    } else {
      const id = req.body;

      const response = await fetch(
        `http://3.65.149.62/test-api/contacts/contact/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (!result) {
        res.status(500).json({ message: 'Server error ' });
      } else {
        res.status(201).json(result);
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed ' });
  }
};

export default handler;
