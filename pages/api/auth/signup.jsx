import { connectToDB } from "@/helpers/db";
import { hashPassword } from "@/helpers/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  const data = req.body;

  const { name, userName, email, password } = data;

  if (!name || !userName || !email || !email.includes("@") || !password) {
    res.status(422).json({ message: "Please fill in the form" });
    return;
  }

  const client = await connectToDB();

  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    name: name,
    userName: userName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  res.status(201).json({ message: "Create new user" });
}
