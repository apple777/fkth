import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

// Reuse the client across hot reloads in dev
const globalForMongo = global as unknown as { _mongoClientPromise?: Promise<MongoClient> };

if (process.env.NODE_ENV === 'development') {
  if (!globalForMongo._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
    });
    globalForMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalForMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
  });
  clientPromise = client.connect();
}

export async function getDb(dbName = 'fkth') {
  const c = await (clientPromise as Promise<MongoClient>);
  return c.db(dbName);
}

export async function getCollection<T = unknown>(name: string, dbName = 'fkth') {
  const db = await getDb(dbName);
  return db.collection<T>(name);
}
