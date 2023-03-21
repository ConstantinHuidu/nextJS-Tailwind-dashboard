import React from "react";
import { getSession } from "next-auth/react";
import Signup from "@/components/Signup";

const signup = () => {
  return <Signup />;
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

export default signup;
