import { verifyPassword } from "../../../helpers/auth";
import { connectToDB } from "../../../helpers/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connectToDB();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("There is no user registered with this email");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password");
        }
        client.close();

        return {
          email: user.email,
          name: user.name,
          id: user.id,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
