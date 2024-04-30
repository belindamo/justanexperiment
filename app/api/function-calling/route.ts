import OpenAI from "openai";
import { NextResponse } from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

// And use it like this:
export async function POST(req: Request) {
  try {
    const { messages, functions } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
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
