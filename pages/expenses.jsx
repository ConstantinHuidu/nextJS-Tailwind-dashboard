import ExpenseContainer from "@/components/expenses/ExpenseContainer";
import { getSession } from "next-auth/react";
import React from "react";

const expenses = () => {
  return <ExpenseContainer />;
};

export default expenses;
