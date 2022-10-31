import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/prisma";
// TODO

const TodoPage = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">TODO</h1>
    </div>
  );
};

export default TodoPage;
