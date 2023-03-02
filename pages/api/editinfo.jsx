import { connectToDB } from "@/helpers/db";
import { hashPassword } from "@/helpers/auth";

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "PATCH") return;
  const session = await getSession({ req: req });

  const data = req.body;

  const { newName, newPassword } = data;

  if (!newName || newName.trim().length < 3) {
    res
      .status(422)
      .json({ message: "Name needs to be at least 3 characters long" });
    return;
  }

  if (!newPassword || newPassword.trim().length < 6) {
    res
      .status(422)
      .json({ message: "Password needs to be at least 3 characters long" });
    return;
  }

  const client = await connectToDB();

  const db = client.db();

  const hashedPassword = await hashPassword(newPassword);
  const userEmail = session.user.email;

  const result = await db
    .collection("users")
    .updateOne(
      { email: userEmail },
      { $set: { name: newName, password: hashedPassword } }
    );

  client.close();

  res.status(201).json({ message1: "User details updated" });
}
