import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../lib/prisma";

interface Comments {
  comments: {
    id: string;
    title: string;
    comment: string;
  }[];
}
interface FormData {
  comment: string;
  id: string;
}

const TodoPage = ({ comments }: Comments) => {
  // TODO
  //setting eg user details address
  //home page ui and design
  //page [id] details of the post
  //login page ui and design
  //login system
  const [form, setForm] = useState<FormData>({
    comment: "",
    id: "",
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    try {
      fetch("http://localhost:3000/api/todo", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteNote(data.id);
          setForm({ comment: "", id: "" });
          refreshData();
        } else {
          setForm({ comment: "", id: "" });
          refreshData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/todo/${id}`, {
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

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Comments</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          placeholder="Content"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {comments.map((todo) => (
            <li key={todo.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-sm">{todo.comment}</h3>
                </div>
                <button
                  onClick={() =>
                    setForm({
                      comment: todo.comment,
                      id: todo.id,
                    })
                  }
                  className="bg-blue-500 mr-3 px-3 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteNote(todo.id)}
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

export default TodoPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const comments = await prisma.todo.findMany({
    select: {
      id: true,
      comment: true,
    },
  });

  return {
    props: {
      comments,
    },
  };
};
