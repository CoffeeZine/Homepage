import { useRouter } from "next/router";
import { useState } from "react";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Dashboard</h1>
    </div>
  );
};

export default Dashboard;
