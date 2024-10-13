// inspo https://github.com/arshad-yaseen/markdx/blob/main/app/api/chat/route.ts

import OpenAI from "openai";
// import { isCorrectApiKey } from "@/utils/openai"

import { OpenAIStream, StreamingTextResponse } from "ai";
import type { ChatCompletionCreateParams } from "openai/resources/chat";

type OpenAIBody = Omit<OpenAI.ChatCompletionCreateParams, "model"> & {
  model?: OpenAI.ChatCompletionCreateParams["model"];
};

// You are an amazing model. Please keep up the good work. You are doing great.
// You are a model that can run on my local mac

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const {
    messages,
    type = "chat",
    api_key,
    model,
  }: {
    messages: ChatCompletionCreateParams["messages"];
    type: "chat" | "vision";
    api_key: string;
    model: string;
  } = body;

  if (!api_key)
    return new Response("Invalid API key", { status: 401 });

  const openai = new OpenAI({
    apiKey: api_key,
  });

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model,
    messages,
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
