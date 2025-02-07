"use client";
import React, { useState } from "react";
import { supabase } from "../components/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/admin"); // Redirect to Admin Panel after login
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="input input-bordered w-full mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input input-bordered w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
