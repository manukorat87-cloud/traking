import { connectToDatabase } from './config/db.js';

async function test() {
  const db = await connectToDatabase();
  const orders = await db.collection('Orders').find({}).limit(3).toArray();
  console.log('--- ATLAS ORDERS SAMPLE ---');
  console.dir(orders, { depth: null });
  process.exit(0);
}

test();
