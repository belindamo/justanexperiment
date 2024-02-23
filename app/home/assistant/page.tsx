"use client";

import {
  Message,
  // import as useAssistant:
  experimental_useAssistant as useAssistant,
} from "ai/react";

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "black",
  function: "blue",
  assistant: "green",
  data: "orange",
  tool: "purple",
};

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/assistant" });

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${m.role}: `}</strong>
          {m.role !== "data" && m.content}
          {m.role === "data" && (
            <>
              {/* here you would provide a custom display for your app-specific data:*/}
              {(m.data as any).description}
              <br />
              <pre className={"bg-gray-200"}>
                {JSON.stringify(m.data, null, 2)}
              </pre>
            </>
          )}
          <br />
          <br />
        </div>
      ))}

      {status === "in_progress" && (
        <div className="mb-8 h-8 w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600" />
      )}

      <form onSubmit={submitMessage}>
        <input
          disabled={status !== "awaiting_message"}
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="What is the temperature in the living room?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
