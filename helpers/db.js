import { MongoClient } from "mongodb";

export async function connectToDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://constantinhuidu:SJWD9z962beqY1wZ@cluster0.03wa0ru.mongodb.net/dashboard?retryWrites=true&w=majority"
  );

  return client;
}
