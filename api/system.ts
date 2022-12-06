import { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection, ObjectId } from 'mongodb';
import * as MongoDB from '../lib/mongodb';

interface System {
  systemId?: number,
  name?: string,
  description?: string,
}

interface SystemCondition extends System {

}

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
    const condition: SystemCondition = { systemId: parseInt(systemId) };
    return await systemCollection.findOne(condition);
  }
  else {
    const condition: SystemCondition = {};
    return await systemCollection.find(condition).toArray();
  }
}

async function postData(query: any, body: any) {
  console.log('postData:', query, body);
  const item: System = {
    systemId: parseInt(body.systemId),
    name: body.name || '',
    description: body.description || '',
  };  
  return await systemCollection.insertOne(item);
}

async function putData(query: any, body: any) {
  console.log('putData:', query, body);
  const { systemId } = query;
  
  const condition: SystemCondition = { systemId: parseInt(systemId) };

  const item: System = {};
  if (body.name)  item.name = body.name;
  if (body.description)  item.description = body.description;

  return await systemCollection.updateOne(condition, { $set: item });    
}

async function deleteData(query: any) {
  console.log('deleteData:', query);
  const { systemId } = query;  
  const condition: SystemCondition = { systemId: parseInt(systemId) };
  return await systemCollection.deleteOne(condition);
}
