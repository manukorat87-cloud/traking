import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGODB_DATABASE || 'ShopifyStore';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log(`[MongoDB] Connected successfully to server at ${MONGODB_URI.split('@').pop()}`);
    db = client.db(DB_NAME);
    
    // Ensure index on tracking_token
    const ordersCollection = db.collection('Orders');
    await ordersCollection.createIndex({ tracking_token: 1 }, { unique: true, sparse: true });
    console.log(`[MongoDB] Ensured index on tracking_token in ${DB_NAME}.Orders`);

    return db;
  } catch (error) {
    console.error(`[MongoDB Error] Failed to connect to database ${DB_NAME}:`, error);
    throw error;
  }
}

export async function getDb(): Promise<Db> {
  if (!db) {
    return await connectToDatabase();
  }
  return db;
}

export async function getOrdersCollection(): Promise<Collection> {
  const database = await getDb();
  return database.collection('Orders');
}

export async function getSettingsCollection(): Promise<Collection> {
  const database = await getDb();
  return database.collection('Settings');
}
