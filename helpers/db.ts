import { MongoClient } from "mongodb";

export async function connectToDB() {
  const MONGODB_URL = process.env.MONGODB_URI;
  const client = await MongoClient.connect(MONGODB_URL);

  return client;
}
