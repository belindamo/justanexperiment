import { Message } from "ai/react";

export interface Template {
  title: string;
  format:
    | "string"
    | "markdown"
    | "html"
    | "json"
    | "yaml"
    | "toml"
    | "csv"
    | "tsv"
    | "xml"
    | "yaml"
    | "toml"
    | "csv"
    | "tsv"
    | "xml";
  audience?: string;
  sampleTexts?: [
    {
      text: string;
      chatHistory?: Message[];
      systemPrompt?: string;
      model?: string;
    },
  ];
  description?: string;
  icon?: React.ComponentType;
}