import { connectToDatabase } from './config/db.js';

async function test() {
  const db = await connectToDatabase();
  const docs = await db.collection('Orders').find({}).limit(5).toArray();
  console.log('[REAL MONGODB ORDERS IN DATABASE]:');
  console.log(JSON.stringify(docs, null, 2));
  process.exit(0);
}

test();
