"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <Controls />
      <Messages />
    </VoiceProvider>
  );
}
