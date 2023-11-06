"use client";
import router from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";
import { Logins, LoginFormData } from "../../constant/index";

const Login = ({ login }: Logins) => {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  // const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: LoginFormData) {
    try {
      fetch("http://localhost:3000/api/login", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setForm({ email: "", password: "" });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: LoginFormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mt-4">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
        className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
      >
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border-2 rounded border-gray-600 p-1"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-1">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
