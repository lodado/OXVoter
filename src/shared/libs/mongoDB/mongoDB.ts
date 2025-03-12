// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL as string;
const options = {};

let client: MongoClient | null = null;
let mongoDbClient: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, reuse the MongoClient instance.
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  mongoDbClient = globalWithMongo._mongoClientPromise;
} else {
  // In production, create a new MongoClient instance.
  client = new MongoClient(uri, options);
  mongoDbClient = client.connect();
}

export default mongoDbClient;
