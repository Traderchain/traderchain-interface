import { VercelRequest, VercelResponse } from '@vercel/node';
import { requestSystemT } from '../lib/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {        
    const url = 'stock/watchlist';
    const result = await requestSystemT({url});
    res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
