import { connectToDB } from "@/helpers/db";

// === Get all expense categories for the logged in user ===
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userEmail } = req.query;

    const client = await connectToDB();

    const db = client.db();

    const result = await db
      .collection("transactionCategories")
      .find({ email: userEmail })
      .sort({ expenseCategory: 1 })
      .collation({ locale: "en", caseLevel: true })
      .toArray();

    res.status(201).json(result);
    client.close();
  }
}
