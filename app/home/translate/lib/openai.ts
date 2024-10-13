type Message = {
  role: 'user' | 'system' | 'assistant',
  content: string,
};

export const sendMessageToOpenAI = async (
  key: string,
  model: string,
  inputText: string,
  responseCallback: (messageChunk: string) => void,
  systemMessage?: string,
): Promise<string> => {
  // Prepare the message to be sent to OpenAI
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

    // Call backend api for OpenAI chat
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        api_key: key,
        model: model,
        messages
      })
    });

    // Check for valid response
    if (response.status !== 200 || !response.body) throw new Error("No readable stream available.");

    // Read the response stream and call the responseCallback
    let fullMessage = '';
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      fullMessage += chunk;
      responseCallback(fullMessage); // Changed onMessagePart to responseCallback
    }
    reader.releaseLock();

    return fullMessage;
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw error;
  }
}

export const validateOpenAIKey = async (key: string): Promise<boolean> => {
  try {
    await sendMessageToOpenAI(key, 'gpt-3.5-turbo', 'Say this is a test', () => { });
    return true;
  } catch {
    return false;
  }
}