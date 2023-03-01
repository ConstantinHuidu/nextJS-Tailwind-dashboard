import { connectToDB } from "@/helpers/db";
import { hashPassword } from "@/helpers/auth";

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const session = await getSession({ req: req });

  const data = req.body;

  const { newName, newPassword } = data;

  if (!newName || !newPassword) {
    res.status(422).json({ message: "Please fill in the form" });
    return;
  }

  const client = await connectToDB();

  const db = client.db();

  const hashedPassword = await hashPassword(newPassword);
  const userEmail = session.user.email;

  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  const result = await db
    .collection("users")
    .updateOne(
      { email: userEmail },
      { $set: { name: newName, password: hashedPassword } }
    );

  client.close();

  res.status(201).json({ message1: "User details updated" });
}
