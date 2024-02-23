"use client";

import { useCompletion } from "ai/react";

export default function Chat() {
  const { completion, input, handleInputChange, handleSubmit, error } =
    useCompletion();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {error && (
        <div className="fixed left-0 top-0 w-full bg-red-500 p-4 text-center text-white">
          {error.message}
        </div>
      )}
      {completion}
      <input
        className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
        value={input}
        placeholder="Say something..."
        onChange={handleInputChange}
      />
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
