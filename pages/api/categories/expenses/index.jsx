import { connectToDB } from "@/helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    const { userEmail, transactionType, transactionName } = data;

    if (!transactionName || !transactionType) {
      res.status(422).json({ message: "Fields can't be empty" });
      client.close();
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    const expenses = await db.collection("expenseCategories").findOne({
      email: userEmail,
      transactionType: transactionType,
      transactionName: transactionName,
    });

    if (expenses) {
      res.status(422).json({ message: "This category already exists" });
      client.close();
      return;
    }

    const result = await db.collection("expenseCategories").insertOne({
      email: userEmail,
      transactionName: transactionName,
      transactionType: transactionType,
    });

    res.status(201).json({ message: "Created a new expense category" });
    client.close();
  }
}
