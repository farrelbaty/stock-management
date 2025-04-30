"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la connexion");
      }

      const data = await response.json();
      setEmail("");
      setPassword("");
      router.replace("/centre-diagnostic");
      return data;
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Connexion
      </h2>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Se connecter
      </button>
    </form>
  );
}
