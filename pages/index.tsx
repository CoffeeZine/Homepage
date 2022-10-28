import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
interface FormData {
  title: string;
  content: string;
  id: string;
}
export default function Home() {
  const [form, setFrom] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  async function create(data: FormData) {
    try {
      await fetch("https://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() =>
        setFrom({
          title: "",
          content: "",
          id: "",
        })
      );
    } catch (error) {
      console.log("error");
    }
  }
  const handleSubmit = async (data: FormData) => {
    try {
      await create(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Hello world!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setFrom({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setFrom({ ...form, content: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-while rounded p-1">
          Add +
        </button>
      </form>
    </div>
  );
}
