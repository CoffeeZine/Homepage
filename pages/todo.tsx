import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/prisma";
// TODO
//setting eg user details address
//home page ui and design
//page [id] details of the post
//login page ui and design
//login system
const TodoPage = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">TODO</h1>
    </div>
  );
};

export default TodoPage;
