import { GetServerSideProps } from "next";
import TransactionContainer from "../components/transactions/TransactionContainer";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const transactions = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransactionContainer />
    </>
  );
};

// === SERVER-SIDE REDIRECT IF USER IS NOT AUTHENTICATED ===
export const getServerSideProps: GetServerSideProps = async (context) => {
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
};

export default transactions;
