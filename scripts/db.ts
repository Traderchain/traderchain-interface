import * as MongoDB from '../lib/mongodb';

async function main() {
  try {    
    const systemCollection = MongoDB.getCollection("system");
    await systemCollection.createIndex({ "systemId": 1 }, { unique: true });
    await systemCollection.createIndex({ "trader": 1 });
    console.log('Complete.');
  }
  catch(err) {
    console.log(err);    
  }  
  process.exit(1);
}
main();
