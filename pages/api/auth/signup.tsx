import { connectToDB } from "../../../helpers/db";
import { hashPassword } from "../../../helpers/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  const data = req.body;

  const { name, userName, email, password } = data;

  if (!name || !userName || !email || !email.includes("@") || !password) {
    res.status(422).json({ message: "Please fill in the form" });
    return;
  }

  const client = await connectToDB();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({
      message: "This e-mail address is already associated with an account",
    });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    name: name,
    userName: userName,
    email: email.toLowerCase(),
    password: hashedPassword,
    id: null,
  };

  const result = await db.collection("users").insertOne(newUser);
  newUser.id = result.insertedId;
  const expenseDefaultCategory = await db
    .collection("transactionCategories")
    .insertOne({
      email: email.toLowerCase(),
      transactionName: "Uncategorized",
      transactionType: "Expenses",
    });
  const incomeDefaultCategory = await db
    .collection("transactionCategories")
    .insertOne({
      email: email.toLowerCase(),
      transactionName: "Uncategorized",
      transactionType: "Income",
    });
  res.status(201).json({ message: "Created new user", user: newUser });

  client.close();
}
