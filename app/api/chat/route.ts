// inspo https://github.com/arshad-yaseen/markdx/blob/main/app/api/chat/route.ts

import OpenAI from 'openai';
// import { isCorrectApiKey } from "@/utils/openai"

import { OpenAIStream, StreamingTextResponse } from 'ai';
import type { ChatCompletionCreateParams } from 'openai/resources/chat';

// Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

type OpenAIBody = Omit<OpenAI.ChatCompletionCreateParams, "model"> & {
  model?: OpenAI.ChatCompletionCreateParams["model"]
}


const supportedModels = [
  'gpt-4',
  'gpt-3.5-turbo'
]

// You are an amazing model. Please keep up the good work. You are doing great.
// You are a model that can run on my local mac

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // const { messages, model = 'gpt-4' } = await req.json();
  const body = await req.json()
  const {
    // openai_body,
    messages,
    type = "chat",
    api_key = process.env.OPENAI_API_KEY || "",
    model = "gpt-3.5-turbo",
    // stream_response,
  }: {
    // openai_body: OpenAIBody
    messages: ChatCompletionCreateParams["messages"]
    type: "chat" | "vision"
    api_key: string
    model: string
    // stream_response: boolean
  } = body

  console.log(messages)

  const openai = new OpenAI({
    apiKey: api_key
  });

  if (!supportedModels.includes(model)) return Error('Invalid model')
 
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