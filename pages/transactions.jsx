import TransactionContainer from "@/components/expenses/TransactionContainer";
import { getSession } from "next-auth/react";
import React from "react";

const transactions = () => {
  return <TransactionContainer />;
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

export default transactions;
