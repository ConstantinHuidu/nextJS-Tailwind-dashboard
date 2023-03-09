import { connectToDB } from "@/helpers/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { userEmail, categoryName } = data;

    if (!categoryName) {
      res.status(422).json({ message: "Category name can't be empty" });
      client.close();
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    const expenses = await db
      .collection("expenseCategories")
      .findOne({ expenseCategory: categoryName });

    if (expenses) {
      res.status(422).json({ message: "This category already exists" });
      client.close();
      return;
    }

    const result = await db.collection("expenseCategories").insertOne({
      email: userEmail,
      expenseCategory: categoryName,
    });

    res.status(201).json({ message: "Created a new expense category" });
    client.close();
  }
}
