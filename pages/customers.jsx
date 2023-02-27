import React, { useEffect } from "react";
import CustomerRow from "@/components/CustomerRow";
import Header from "@/components/Header";
import data from "@/data/data";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const customers = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header message={"Customers"} />

      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Name</span>
            <span className="sm:text-left text-right">Email</span>
            <span className="hidden md:grid"> Last Order</span>
            <span className="hidden sm:grid">Payment method</span>
          </div>
          <ul>
            {data.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default customers;
