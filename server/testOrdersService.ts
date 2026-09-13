import { connectToDatabase } from './config/db.js';
import { getOrders } from './services/orderService.js';

async function test() {
  await connectToDatabase();
  const res = await getOrders({ page: 1, limit: 10, statusFilter: 'all' });
  console.log('Result from getOrders({}):', JSON.stringify(res, null, 2));
  process.exit(0);
}

test();
