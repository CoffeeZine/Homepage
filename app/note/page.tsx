"use client";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { prisma } from "../../lib/prisma";
import { Notes, NoteFormData } from "../../constant/index";
import { PrismaClient } from "@prisma/client";

const Note = () => {
  //no time to study the problem
  // const Note = ({ notes }: Notes) => {
  // const prisma = new PrismaClient();
  const [form, setForm] = useState<NoteFormData>({
    title: "",
    content: "",
    id: "",
  });
  const [notes, setNotes] = useState<Notes[]>([]);
  // useEffect(() => {
  //   (async () => {
  // console.log("hello");
  // const note: any = await prisma.note.findMany({
  //   select: {
  //     title: true,
  //     id: true,
  //     content: true,
  //   },
  // });
  // console.log("note" + note);
  // if (!note) {
  //   router.push("/notFound");
  //   return;
  // }
  // setNotes(note);
  //   })();
  // }, []);

  const router = useRouter();

  const refreshData = () => {
    router.push("/note");
  };

  async function create(data: NoteFormData) {
    try {
      fetch("http://localhost:3000/api/create", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteNote(data.id);
          setForm({ title: "", content: "", id: "" });
          console.log("refresh");
          refreshData();
        } else {
          setForm({ title: "", content: "", id: "" });
          alert("error");
          refreshData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: NoteFormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Notes</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border-2 rounded border-gray-600 p-1 bg-blue-300 text-white"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border-2 rounded border-gray-600 p-1 bg-blue-300 text-white"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {notes?.map((note: any) => (
            <li key={note.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{note.title}</h3>
                  <p className="text-sm">{note.content}</p>
                </div>
                <button
                  onClick={() =>
                    setForm({
                      title: note.title,
                      content: note.content,
                      id: note.id,
                    })
                  }
                  className="bg-blue-500 mr-3 px-3 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 px-3 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
