const { OpenAI } = require('openai');

// Initialize OpenAI client with your API key from the environment variables
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const buildOpenAIPrompt = (messages) => {
  // Ensure the last message is from a "user"
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    throw new Error("The last message in the prompt must be from the 'user'.");
  }

  // OpenAI's chat completion endpoint expects a slightly different format
  return messages.map(message => ({
    role: message.role,
    content: message.content
  }));
};

export const sendMessageToOpenAI = async (
  inputText: string, 
  responseCallback: (messageChunk: string) => void, 
  model: string,
  systemMessage?: string,
  ) => {
    
  try {
    const messages = [
      { role: 'user', content: inputText }, 
    ];
    if (systemMessage) {
      messages.unshift({
        role: "system",
        content: systemMessage
      });
    }
    console.log(model, messages)
    // const prompt = buildOpenAIPrompt(messages);
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: true,
    });


    let fullMessage = '';
    for await (const chunk of completion) {
      const messageChunk = chunk.choices[0].delta.content;
      if (messageChunk) { // Skip empty or undefined message chunks
        fullMessage += messageChunk;
        responseCallback(fullMessage); // Changed onMessagePart to responseCallback
      }
    }
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw error;
  }
}
