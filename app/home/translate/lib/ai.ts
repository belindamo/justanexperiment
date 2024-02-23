import { Template } from "./types";
import { Message } from "ai/react";

export const initialMessages = (
  sourceTemplate: Template,
  targetTemplate: Template,
): Message[] => {
  let systemMessage = `My messages are written for a ${sourceTemplate.audience} audience and your messages should be written for a ${targetTemplate.audience} audience.`;

  if (sourceTemplate.sampleTexts.length > 0) {
    systemMessage += `Here's an example of my messages in ${sourceTemplate.format}:\n`;

    for (let i = 0; i < sourceTemplate.sampleTexts.length; i++) {
      const message = sourceTemplate.sampleTexts[i].text + "\n";
      systemMessage += `${i + 1}: ${message}\n`;
    }
  }

  if (targetTemplate.sampleTexts.length > 0) {
    systemMessage += `\nHere's an example of your messages in ${targetTemplate.format}:\n`;

    for (let i = 0; i < targetTemplate.sampleTexts.length; i++) {
      const message = targetTemplate.sampleTexts[i].text + "\n";
      systemMessage += `${i + 1}: ${message}\n`;
    }
  }

  return [{ id: "0", role: "system", content: systemMessage }];
};
