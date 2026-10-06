import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      const data =
        await login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        data.token
      );

      navigate(
        "/admin/dashboard"
      );

    } catch {

      alert("Login gagal");

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-8 rounded-xl w-96"
      >

        <h1 className="text-2xl font-bold mb-6">

          Login Admin

        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <button
          className="w-full bg-amber-700 text-white py-3"
        >
          Login
        </button>

      </form>

    </div>

  );
}