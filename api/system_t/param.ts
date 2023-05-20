import { VercelRequest, VercelResponse } from '@vercel/node';
import { toQueryString, requestSystemT } from '../../lib/utils.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { url, method, query, cookies } = req;
    console.log({ url, method, query });

    const {pid} = query;
    const api = `stock/param/${pid}?` + toQueryString(query);
    const result = await requestSystemT({api});
    res.status(200).json(result);
  }
  catch(err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
