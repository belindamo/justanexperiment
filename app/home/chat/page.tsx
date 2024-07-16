"use client";

import { useModelStorageContext } from "@/components/providers/model-storage";
import { useChat } from "ai/react";
import { useEffect } from "react";
import { toast } from "sonner"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();
  const { enabledModels, selectedModel, openAIKey } = useModelStorageContext();

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while sending the message to the model.");
    }
  }, [error]);

  const handleFormSubmit = (submitData: any) => {
    if(!openAIKey){
      toast.error("Before using the tool, please enter an OpenAI key in the settings.")
      return;
    }
    handleSubmit(submitData, { options: { body: { 'model': selectedModel ?? enabledModels[0] ?? 'gpt-3.5-turbo', 'api_key': openAIKey } } });
  };
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      <form onSubmit={handleFormSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
