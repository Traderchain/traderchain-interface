import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    res.status(200).json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
      REACT_APP_DOMAIN: process.env.REACT_APP_DOMAIN
    });  
  }
  catch(error) {
    res.status(400).json({ error });
  }  
}
