import { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection, ObjectId } from 'mongodb';
import * as MongoDB from '../lib/mongodb';

let systemCollection: Collection;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {    
    const { method, query, body, cookies } = req;
    console.log({ method, query, body });

    systemCollection = MongoDB.getCollection("system");
    // systemCollection.createIndex({ "systemId": 1 }, { unique: true });

    let result: any;

    switch(method) {
      case 'GET':
        result = await getData(query);
        break;
      case 'POST':
        result = await postData(query, body);        
        result = await getData(query);
        break;
      case 'PUT':
        result = await putData(query, body);
        result = await getData(query);
        break;
      case 'DELETE':
        result = await deleteData(query);        
        break;
    }
        
    res.status(200).json(result);
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}

async function getData(query: any) {
  console.log('getData:', query);
  const { systemId } = query;  

  if (systemId) {
    const condition = { systemId };
    return await systemCollection.findOne(condition);
  }
  else {
    const condition = {};
    return await systemCollection.find(condition).toArray();
  }  
}

async function postData(query: any, body: any) {
  console.log('postData:', query, body);
  const item = body;
  return await systemCollection.insertOne(item);
}

async function putData(query: any, body: any) {
  console.log('putData:', query, body);
  const { systemId } = query;
  const condition = { systemId };
  const item = body;  
  return await systemCollection.updateOne(condition, { $set: item });    
}

async function deleteData(query: any) {
  console.log('deleteData:', query);
  const { systemId } = query;
  const condition = { systemId };
  return await systemCollection.deleteOne(condition);
}
