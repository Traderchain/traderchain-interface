import { VercelRequest, VercelResponse } from '@vercel/node';
import * as MongoDB from '../lib/mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {    
    const collection1 = MongoDB.getCollection("collection1");

    let result: any;

    let item = { name: 'item1' };
    result = await collection1.insertOne(item);    
    console.log(result);    
    let _id = result.insertedId;    
    
    item = { name: 'item1.2' };
    const query = { _id };  
    result = await collection1.updateOne(query, { $set: item });
    console.log(result);

    // const query = { _id };
    // result = await collection1.deleteOne(query);
    // console.log(result);
                    
    result = await collection1.find({}).toArray();    
    
    // const query = { _id };
    // const item = await collection1.findOne(query);
    // result = item;
        
    res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}
