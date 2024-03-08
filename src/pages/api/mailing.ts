import { NextApiRequest, NextApiResponse } from 'next';
import mailgun from "mailgun-js";

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_DOMAIN || "",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, list } = req.body;

    if (!email || !list) {
      return res.status(400).json({ message: 'Email and list are required' });
    }

    const data = {
      subscribed: true,
      address: email,
      name: ""
    };

    try {
      await mg.lists(list).members().create(data);
      res.status(200).json({ message: 'Email added to list successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}