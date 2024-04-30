const { OpenAI } = require('openai');

type Message = {
  role: 'user' | 'system' | 'assistant',
  content: string,
};

export const sendMessageToOpenAI = async (
  key: string,
  inputText: string,
  responseCallback: (messageChunk: string) => void,
  model: string,
  systemMessage?: string,
) => {
  // Initialize OpenAI client with user API key from the settings
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })
  try {
    const messages: Message[] = [
      { role: 'user', content: inputText }, 
    ];
    if (systemMessage) {
      messages.unshift({
        role: "system",
        content: systemMessage
      });
    }
    console.log(model, messages)
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

export const validateOpenAIKey = async (key: string): Promise<boolean> => {
  const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Say this is a test' }],
      stream: true,
    });
    return true;
  } catch {
    return false;
  }
}