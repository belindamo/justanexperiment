import OpenAI from "openai";
import { NextResponse } from "next/server";

// Set the runtime to edge
export const runtime = "edge";

// And use it like this:
export async function POST(req: Request) {
  try {
    const { messages, functions, model, api_key } = await req.json();

    if (!api_key)
      return new Response("Invalid API key", { status: 401 });

    const openai = new OpenAI({
      apiKey: api_key,
    });

    const response = await openai.chat.completions.create({
      model,
      messages,
      functions,
    });
    console.log(response);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
