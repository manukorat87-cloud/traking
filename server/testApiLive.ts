async function testApi() {
  // 1. Login
  const loginRes = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'admin123' }),
  });

  const loginData = await loginRes.json();
  console.log('Login Result:', loginData.success ? 'SUCCESS' : 'FAILED', loginData);

  if (!loginData.token) process.exit(1);

  // 2. Fetch Orders
  const ordersRes = await fetch('http://localhost:5000/api/admin/orders?page=1&limit=5', {
    headers: { Authorization: `Bearer ${loginData.token}` },
  });

  const ordersData = await ordersRes.json();
  console.log('--- LIVE API ORDERS FETCH SUCCESS ---');
  console.log('Total Count in DB:', ordersData.pagination.total);
  console.log('Orders on Page 1:', ordersData.orders.length);
  console.log('First Order Customer:', ordersData.orders[0]?.customerName, 'Email:', ordersData.orders[0]?.email, 'City:', ordersData.orders[0]?.city);
}

testApi().catch(console.error);
