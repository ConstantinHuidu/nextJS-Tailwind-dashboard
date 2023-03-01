import React from "react";
import AccountSettings from "@/components/AccountSettings";
import { getSession } from "next-auth/react";

const accountInfo = () => {
  return <AccountSettings />;
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
