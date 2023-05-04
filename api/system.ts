import { VercelRequest, VercelResponse } from '@vercel/node';
import { Collection, ObjectId } from 'mongodb';
import * as MongoDB from '../lib/mongodb';
import { Method } from '../src/utils/constants';

interface System {
  systemId?: number,
  trader?: string,
  name?: string,
  description?: string,
}

interface SystemCondition extends System {

}

let systemCollection: Collection;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {    
    const { url, method, query, body, cookies } = req;
    console.log({ url, method, query, body });

    systemCollection = MongoDB.getCollection("system");    

    let result: any;

    switch(method) {
      case Method.GET:
        result = await getData(query);
        break;
      case Method.POST:
        result = await postData(query, body);
        result = await getData(query);
        break;
      case Method.PUT:
        result = await putData(query, body);
        result = await getData(query);
        break;
      case Method.DELETE:
        result = await deleteData(query);        
        break;
    }
            
    // res.status(200).json(result);
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(result, null, 2));
  }
  catch(err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }  
}

async function getData(query: any) {
  console.log('getData:', query);
  const { systemId, trader } = query;  

  if (systemId) {
    const condition: SystemCondition = { systemId: parseInt(systemId) };
    return await systemCollection.findOne(condition);
  }
  else {
    const condition: SystemCondition = {};
    if (trader)  condition.trader = trader.toLowerCase();
    return await systemCollection.find(condition).toArray();
  }
}

async function postData(query: any, body: any) {
  console.log('postData:', query, body);
  const item: System = {
    systemId: parseInt(body.systemId),
    trader: body.trader || '',
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
  if (body.trader)  item.trader = body.trader;
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
