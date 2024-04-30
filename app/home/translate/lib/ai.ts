import { Template } from "./types";

export const getSystemMessage = (
  sourceTemplate: Template,
  targetTemplate: Template,
): string => {
  let systemMessage = `User messages are written as ${sourceTemplate.title} and assistant messages are written as ${targetTemplate.title}.`

  if (sourceTemplate.format != 'string') {
    systemMessage += `\nUser messages should be in ${sourceTemplate.format} format.`
  }

  if (targetTemplate.format != 'string') {
    systemMessage += `Assistant messages should be in ${targetTemplate.format} format.`
  }

  return systemMessage;
};
