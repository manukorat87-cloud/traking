import { MongoClient } from 'mongodb';

const hosts = ["itr.bgwoypp.mongodb.net"];
const users = ["meetjbs", "Meetjbs", "meet", "Meet"];
const passwords = ["Meet@123", "meet@123", "Meet123", "Meet@123#", "Meet#123"];
const authSources = ["admin", "ShopifyStore"];

async function tryConnect(user: string, pass: string, authSource: string) {
  const uri = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@itr.bgwoypp.mongodb.net/ShopifyStore?authSource=${authSource}&retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 3000 });
  try {
    await client.connect();
    const db = client.db("ShopifyStore");
    const count = await db.collection("Orders").countDocuments();
    console.log(` SUCCESS! User: "${user}", Pass: "${pass}", AuthSource: "${authSource}". Count: ${count}`);
    await client.close();
    return true;
  } catch (err: any) {
    // console.log(` Failed: User: "${user}", Pass: "${pass}", AuthSource: "${authSource}" -> ${err.message}`);
    await client.close().catch(() => {});
    return false;
  }
}

async function run() {
  console.log("Testing connection variations...");
  for (const u of users) {
    for (const p of passwords) {
      for (const a of authSources) {
        const ok = await tryConnect(u, p, a);
        if (ok) process.exit(0);
      }
    }
  }
  console.log("All variations tested.");
  process.exit(1);
}

run();
