import { MongoClient } from 'mongodb';

async function testAuth() {
  const uri = "mongodb+srv://itr.bgwoypp.mongodb.net/ShopifyStore?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    auth: {
      username: "meetjbs",
      password: "Meet@123"
    }
  });

  try {
    await client.connect();
    const db = client.db("ShopifyStore");
    const count = await db.collection("Orders").countDocuments();
    console.log("SUCCESSFULLY CONNECTED TO ATLAS! Document count:", count);
    const sample = await db.collection("Orders").findOne({});
    console.log("Sample Order:", JSON.stringify(sample, null, 2));
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error("Auth test error:", err);
    process.exit(1);
  }
}

testAuth();
