import { connectToDB } from "../../../helpers/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const {
      transactionType,
      transactionName,
      amount,
      date,
      description,
      userEmail,
    } = data;

    if (!transactionType) {
      res.status(422).json({ message: "Transaction type can't be empty" });
      return;
    }

    if (!transactionName) {
      res.status(422).json({ message: "Transaction name can't be empty" });
      return;
    }

    if (!amount) {
      res.status(422).json({ message: "Amount can't be empty" });
      return;
    }

    if (!date) {
      res.status(422).json({ message: "Date can't be empty" });
      return;
    }

    const client = await connectToDB();

    const db = client.db();

    const newExpense = {
      userEmail: userEmail,
      transactionType: transactionType,
      transactionName: transactionName,
      amount: amount,
      date: date,
      description: description,
    };

    const result = await db.collection("transactions").insertOne(newExpense);

    res.status(201).json({ message: "New transaction added" });
    client.close();
  }
}
