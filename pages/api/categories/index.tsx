import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "../../../helpers/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const { userEmail, transactionType, transactionName } = data;

    if (!transactionName || !transactionType) {
      res.status(422).json({ message: "Fields can't be empty" });
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    const expenses = await db.collection("transactionCategories").findOne({
      email: userEmail,
      transactionType: transactionType,
      transactionName: transactionName,
    });

    if (expenses) {
      res.status(422).json({ message: "This category already exists" });
      client.close();
      return;
    }

    const result = await db.collection("transactionCategories").insertOne({
      email: userEmail,
      transactionName: transactionName,
      transactionType: transactionType,
    });

    res.status(201).json({ message: "Created a new category" });
    client.close();
  }
}
