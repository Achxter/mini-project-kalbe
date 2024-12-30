'use client';

import React, { startTransition } from "react";
import { loginWithEmailAndPassword } from "../actions";
import { AuthTokenResponse } from "@supabase/supabase-js";

export default function AuthForm() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    startTransition(async () => {
      const { error } = await loginWithEmailAndPassword(data) as unknown as AuthTokenResponse;
      console.log(error)
      if (error) {
        alert(`Fail to login: ${error.message}`);
      } else {
        alert("Successfully login 🎉");
      }
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-sm p-8 rounded bg-white" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
