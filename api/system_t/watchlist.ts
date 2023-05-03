import { VercelRequest, VercelResponse } from '@vercel/node';
import { toQueryString, requestSystemT } from '../../lib/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { url, method, query, body, cookies } = req;
    console.log({ url, method, query, body });

    const api = 'stock/watchlist?' + toQueryString(query);
    const result = await requestSystemT({api});
    res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
