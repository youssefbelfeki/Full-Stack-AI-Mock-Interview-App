import React from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const Dashboardlayout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
      <Toaster />
    </div>
  );
};

export default Dashboardlayout;
