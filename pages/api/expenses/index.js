import { connectToDB } from "@/helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { categoryName, amount, date, description, userEmail } = data;

    if (!categoryName) {
      res.status(422).json({ message: "Category name can't be empty" });
      client.close();
      return;
    }

    if (!amount) {
      res.status(422).json({ message: "Amount can't be empty" });
      client.close();
      return;
    }

    if (!date) {
      res.status(422).json({ message: "Date can't be empty" });
      client.close();
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    const newExpense = {
      userEmail: userEmail,
      categoryName: categoryName,
      amount: amount,
      date: date,
      description: description,
    };

    const result = await db.collection("expenses").insertOne(newExpense);

    res.status(201).json({ message: "New expense added" });
    client.close();
  }
}
