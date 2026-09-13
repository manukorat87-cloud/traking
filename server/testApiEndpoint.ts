import jwt from 'jsonwebtoken';
import * as orderService from './services/orderService.js';

async function test() {
  const result = await orderService.getOrders({ page: 1, limit: 10 });
  console.log("Found orders count:", result.orders.length);
  console.log("Total in DB:", result.pagination.total);
}

test();
