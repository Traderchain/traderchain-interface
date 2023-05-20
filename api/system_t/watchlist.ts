import { VercelRequest, VercelResponse } from '@vercel/node';
import { toQueryString, requestSystemT } from '../../lib/utils.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {    
    const { url, method, query, cookies } = req;
    // const body = method == 'POST' ? req.body : null;        
    console.log({ url, method, query });

    const params = { published: 1, trading: 1 };
    const api = 'stock/watchlist?' + toQueryString(params);
    const result = await requestSystemT({api});    
    res.status(200).json(result);
  }
  catch(err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
