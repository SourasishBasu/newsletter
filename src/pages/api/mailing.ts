import { NextApiRequest, NextApiResponse } from 'next';
import mailGun from "mailgun.js";
import formData from "form-data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, list } = req.body;

    if (!email || !list) {
      return res.status(400).json({ message: 'Email and list are required' });
    }

    const MailGun = new mailGun(formData);

    const mg = MailGun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const MAILING_LIST = list;
    const EMAIL_TO_ADD = email;

    const DATA = {
      from: `NEWSLETTER MLSA <newsletter@mlsakiit.com>`,
      to: EMAIL_TO_ADD,
      subject: "NEWSLETTER SUBSCRIPTION CONFIRMATION",
      html: `
            <p style="text-align: center; color: #1a1a1a;">Thank you for subscribing!</p>
          `,
    };

    try {

      // Add email to mailing list
      await mg.lists.members.createMember(MAILING_LIST, {
        address: EMAIL_TO_ADD,
        subscribed: 'yes',
        upsert: 'yes',
      });
      res.status(200).json({ message: 'Email added to list successfully' });

      // Send verification email for first time sign-up
      const mailRes = await mg.messages.create(`${DOMAIN}`, DATA);
      console.log({ mailRes });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
