import React from "react";
import Login from "@/components/Login";
import { getSession } from "next-auth/react";

const login = () => {
  return <Login />;
};

// === SERVER-SIDE REDIRECT IF USER IS AUTHENTICATED ===
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default login;
