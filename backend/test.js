const { MongoClient } = require("mongodb");

const uri =
  "YOUR_MONGODB_URI"; // Paste the same URI from your .env

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected Successfully");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();