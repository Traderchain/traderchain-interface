import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {        
    const result = {};
    res.status(200).json(result);
  }
  catch(err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
