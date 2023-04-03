import React from "react";
import AccountSettings from "@/components/acountSettings/AccountSettings";
import { getSession } from "next-auth/react";
import Head from "next/head";

const accountInfo = () => {
  return (
    <>
      <Head>
        <title>Account settings</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountSettings />;
    </>
  );
};

// === SERVER-SIDE REDIRECT IF USER IS NOT AUTHENTICATED ===
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default accountInfo;
