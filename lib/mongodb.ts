import { MongoClient, ServerApiVersion, Db, Collection, ObjectId } from 'mongodb';

const uri: string = process.env.MONGODB_URI || '';
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 };
const client = new MongoClient(uri, options);
const db: Db = client.db("db1");

export function getCollection(name: string) {
  return db.collection(name);
}
