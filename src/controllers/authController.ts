import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

export async function verifyGoogleToken(req: Request, res: Response): Promise<Response> {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
