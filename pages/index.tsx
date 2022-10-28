import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { prisma } from "../lib/prisma";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
interface Notes {
  notes: { title: string; content: string; id: string }[];
}
interface FormData {
  title: string;
  content: string;
  id: string;
}
const Home = ({ notes }: Notes) => {
  const [form, setFrom] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }).then(() => {
        if (data.id) {
          deleteNote(data.id);
          setFrom({
            title: "",
            content: "",
            id: "",
          });
          refreshData();
        } else {
          setFrom({
            title: "",
            content: "",
            id: "",
          });
          refreshData();
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log("error", error);
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
      <div className="">
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <div>
                <div className="">
                  <h3>{note.title}</h3>
                  <h4>{note.content}</h4>
                </div>
                <button
                  onClick={() =>
                    setFrom({
                      title: note.id,
                      content: note.content,
                      id: note.id,
                    })
                  }
                >
                  update
                </button>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};
