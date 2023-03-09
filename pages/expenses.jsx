import ExpenseContainer from "@/components/expenses/ExpenseContainer";
import { getSession } from "next-auth/react";
import React from "react";

const expenses = () => {
  return <ExpenseContainer />;
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

export default expenses;
