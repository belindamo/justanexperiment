"use client";

import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import { CopyIcon } from "lucide-react";
import { PresetSelector } from "@/app/home/translate/components/preset-selector";
import { presets } from "@/app/home/translate/components/presets";
import { PopoverTranslate } from "@/app/home/translate/components/popover-translate";
import { DialogUnderTheHood } from "@/app/home/translate/components/dialog-under-the-hood";
import { TranslateFilter } from "@/app/home/translate/components/translate-filter";
import { Toolbar } from "./components/toolbar";
import { HoverCardDemo } from "./components/hover-cards";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TemplateCombobox } from "./components/combobox";
import { InlineSnippet } from "@/components/form/domain-configuration";
import { initialMessages } from "./lib/ai";
import { Message } from "ai/react";
import { templates, modelOptions } from "./lib/constants";
import { Template } from "./lib/types";
import { toast } from "sonner";

export default function Translate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sourceTemplate, setSourceTemplate] = useState<Template>(templates[0]);
  const [targetTemplate, setTargetTemplate] = useState<Template>(templates[1]);

  const chatOptions = {
    onFinish: () => {
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error(error);
      setIsLoading(false);
      setError(error);
    },
  };
  const { messages, setMessages, handleInputChange, handleSubmit } =
    useChat(chatOptions);
  const lastAssistantMessage = messages
    .filter((message) => message.role === "assistant")
    .pop();

  const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    setError(null);
    setIsLoading(true);
    setMessages(
      initialMessages(sourceTemplate, targetTemplate).concat(messages),
    );
    handleSubmit(e);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (document.getElementById("translate-form")) {
          document
            .getElementById("translate-form")
            ?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true }),
            );
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="w-full px-8">
      <div className="flex flex-row justify-between pb-8">
        <div className="pt-2 text-primary">
          Copy paste any type of text that you&apos;d like to convert to another
          format
          <div className="pt-4 *:mb-4">
            <div>
              Generate with <InlineSnippet>⌘ / Ctrl + Enter</InlineSnippet>
            </div>
            <form
              id="translate-form"
              onSubmit={handleSubmitWrapper}
              className="*:mr-2"
            >
              <Button type="submit">{isLoading ? "Loading..." : "Run"}</Button>
              {/* <PopoverTranslate title="Add template" /> */}
              {/* <PresetSelector presets={presets} /> */}
              {/* <DialogUnderTheHood /> */}
            </form>
          </div>
        </div>
        <div>{/* <Toolbar /> */}</div>
      </div>
      <Separator />
      {/* <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div> */}
      <ResizablePanelGroup direction="horizontal" className="*:m-8">
        <ResizablePanel>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="source-language">Source Text</Label>
              {/* <TranslateFilter title="Templates" options={templateOptions} /> */}
            </div>
            <TemplateCombobox
              templates={templates}
              template={sourceTemplate}
              setTemplate={setSourceTemplate}
            />
            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
              <Textarea
                className="min-h-[200px] w-full rounded-lg border border-gray-200 p-4 text-base font-normal hover:border-gray-300 focus:border-gray-700 dark:border-gray-800 dark:hover:border-gray-700 dark:focus:border-gray-700"
                id="source-text"
                placeholder="Enter your text"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="flex items-center gap-4">
            <Label htmlFor="target-language">Target(s)</Label>
            {/* <TranslateFilter title="Templates" options={templateOptions}/> */}
            {/* <TranslateFilter title="Models" options={modelOptions} /> */}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <div className="flex justify-between">
                <TemplateCombobox
                  templates={templates}
                  template={targetTemplate}
                  setTemplate={setTargetTemplate}
                />
                {lastAssistantMessage?.content && (
                  <Button variant="ghost">
                    <CopyIcon
                      className="h-4"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          lastAssistantMessage?.content || "",
                        );
                        toast.success("Copied to clipboard");
                      }}
                    />
                  </Button>
                )}
              </div>
              <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <div
                  className="min-h-[200px] w-full resize-none border-0 p-4 text-base font-normal"
                  id="translated-text"
                >
                  {lastAssistantMessage?.content || ""}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div> */}
      {/* {"GPT logs: \n" + JSON.stringify(messages)} */}
      {error != null ?? (
        <div>
          Oops, looks like there was an error from the model provider. Try
          rerunning!
        </div>
      )}
      <div className="flex w-full py-4">
        {/* <Button className="ml-auto lg:hidden" type="submit">
          + Integrate with your accounts +
        </Button> */}
      </div>
    </div>
  );
}
