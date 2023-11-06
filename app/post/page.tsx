"use client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../../lib/prisma";
import { Posts, PostFormData } from "../../constant/index";

const Post = ({ posts }: Posts) => {
  const [form, setForm] = useState<PostFormData>({
    title: "",
    body: "",
    slug: "",
    id: "",
  });
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: PostFormData) {
    try {
      fetch("http://localhost:3000/api/post", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        if (data.id) {
          deleteNote(data.id);
          setForm({ title: "", slug: "", body: "", id: "" });
          refreshData();
        } else {
          setForm({ title: "", slug: "", body: "", id: "" });
          refreshData();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`http://localhost:3000/api/post/${id}`, {
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

  const handleSubmit = async (data: PostFormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Posts</h1>
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
          className="border-2 rounded border-gray-600 p-1"
        />
        <input
          type="text"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <textarea
          placeholder="Content"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          Add +
        </button>
      </form>
      <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch">
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-600 p-2">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-sm">{post.body}</p>
                </div>
                <button
                  onClick={() =>
                    setForm({
                      title: post.title,
                      body: post.body,
                      slug: post.slug,
                      id: post.id,
                    })
                  }
                  className="bg-blue-500 mr-3 px-3 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteNote(post.id)}
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

export default Post;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      id: true,
      body: true,
      slug: true,
    },
  });

  return {
    props: {
      posts,
    },
  };
};
