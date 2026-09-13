import { connectToDatabase } from './config/db.js';

async function seed() {
  console.log('[Seed] Connecting to MongoDB...');
  const db = await connectToDatabase();
  const ordersCollection = db.collection('Orders');

  const count = await ordersCollection.countDocuments();
  if (count > 0) {
    console.log(`[Seed] Found ${count} existing orders in ShopifyStore.Orders. Skipping seed to preserve data.`);
    process.exit(0);
  }

  console.log('[Seed] Collection is empty. Inserting test order matching exact ShopifyStore schema...');

  const sampleOrder = {
    email: 'customer@email.com',
    first_name: 'Meet',
    last_name: 'Sheladiya',
    address: 'C/2, 307 Sundaram Residency',
    city: 'Surat',
    state: 'Gujarat',
    pin: '395010',
    total_amount: '1797',
    order_time: '2026-09-12T02:09:25.425Z',
  };

  const result = await ordersCollection.insertOne(sampleOrder);
  console.log('[Seed] Sample order created with ID:', result.insertedId.toString());
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed Error]', err);
  process.exit(1);
});
