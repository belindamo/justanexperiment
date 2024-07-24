"use client";

import LoadingSpinner from "@/components/form/loading-spinner";
import { useModelStorageContext } from "@/components/providers/model-storage";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat();
  const { enabledModels, selectedModel, openAIKey } = useModelStorageContext();
  const endOfList = useRef(null);

  useEffect(() => {
    if (error) {
      toast.error("An error occurred while sending the message to the model.");
    }
  }, [error]);

  const handleFormSubmit = (submitData: any) => {
    if (isLoading) {
      submitData.preventDefault();
      return;
    }
    if (!openAIKey) {
      toast.error("Before using the tool, please enter an OpenAI key in the settings.")
      return;
    }
    handleSubmit(submitData, { options: { body: { 'model': selectedModel ?? enabledModels[0] ?? 'gpt-3.5-turbo', 'api_key': openAIKey } } });
  };

  useEffect(() => {
    if (endOfList?.current) {
      (endOfList.current as any).scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-col flex-1 w-full overflow-auto my-4">
        <div className="mx-auto flex flex-col w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12">
          {messages.map((m, idx) => (
            <div key={m.id} className={`whitespace-pre-wrap flex flex-row ${idx > 0 ? 'mt-2' : ''}`}>
              <div className="w-12 min-w-12">{m.role === "user" ? "User:" : "AI:"}</div>
              <div>{m.content}</div>
            </div>
          ))}
          <div ref={endOfList} />
        </div>
      </div>
      <div className="flex flex-col w-full my-4">
        <div className="mx-auto flex flex-col w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12">
          <form className="relative" onSubmit={handleFormSubmit}>
            <input
              className={`w-full rounded border border-gray-300 p-2 shadow-xl ${isLoading ? 'pr-10' : ''}`}
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            {isLoading && <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <LoadingSpinner />
            </div>}
          </form>
        </div>
      </div>
    </>
  );
}
