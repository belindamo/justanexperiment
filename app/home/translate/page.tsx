"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { PresetSelector } from "@/app/home/translate/components/preset-selector";
import { presets } from "@/app/home/translate/components/presets";
import { PopoverTranslate } from "@/app/home/translate/components/popover-translate";
import { DialogUnderTheHood } from "@/app/home/translate/components/dialog-under-the-hood";
import { OptionFilter } from "@/app/home/translate/components/option-filter";
import { Toolbar } from "./components/toolbar";
import { HoverCardDemo } from "./components/hover-cards";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { TemplateCombobox } from "./components/template-combobox";
import { getSystemMessage, initialMessages } from "./lib/ai";
import { Message } from "ai/react";
import { TEMPLATES, MODELS } from "./lib/constants";
import { sendMessageToOpenAI } from "./lib/openai";
import { Template } from "./lib/types";
import { toast } from "sonner";
import RichTextEditor from "./components/rich-text-editor";

interface Target {
  model: string;
  template: Template;
  content: string;
}

const INITIAL_TARGETS = [{
  model: MODELS[0],
  template: TEMPLATES[1],
  content: ''
}] as Target[];

let allTemplates = TEMPLATES;

export default function Translate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceContent, setSourceContent] = useState<string>('');
  const [sourceTemplate, setSourceTemplate] = useState<Template>(allTemplates[0]);
  const [targets, setTargets] = useState<Target[]>(INITIAL_TARGETS);

  // Current models and templates being used for grid
  const [models, setModels] = useState<string[]>([MODELS[0]]);
  const [templates, setTemplates] = useState<Template[]>([allTemplates[1]]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const promises = targets.map((target) => {
      return (async () => {
        try {
          console.log('here', sourceContent)
          await sendMessageToOpenAI(
            sourceContent, 
            (messageChunk: string) => {
               
              target.content = messageChunk
            
              setTargets([...targets]);
            },
            target.model,
            getSystemMessage(sourceTemplate, target.template)
            );
        } catch(error: any) {
          console.error('OpenAI error:', error);
          const errorMessage = error.message ? error.message : "An error occurred with OpenAI";
          setError(`OpenAI error: ${errorMessage}`);
        }
      })();
    })
    console.log(promises)

    await Promise.all(promises)
    .then(() => {
      setIsLoading(false);
      console.log('finish')
    });

    // setMessages(
    //   messages
    //   // initialMessages(sourceTemplate, targetTemplate).concat(messages),
    // );
    // handleSubmit(e);
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

  useEffect(() => {
    templates.forEach((t) => {
      models.forEach((m) => {
        const o = targets.find((target) => target.model === m && target.template.title === t.title)
  
        if (o === undefined) {
          targets.push({ model: m, template: t, content: ''})
        }
      })
    })

    const newTargets: Target[] = [];
    targets.forEach((target) => {
      if (templates.includes(target.template) && models.includes(target.model)) {
        newTargets.push(target);
      }
    })
    setTargets(newTargets);

  }, [models, templates])

  return (
    <div className="w-full h-full px-8">
      {/* <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div> */}
      <ResizablePanelGroup direction="horizontal" className="*:mx-4">
        <ResizablePanel>
          <div className="grid gap-4 w-full">
            <div className="flex items-center gap-4">
              {/* <Label htmlFor="source-language">Source Text</Label> */}
              {/* <OptionFilter title="Templates" options={templateOptions} /> */}
            </div>
            <TemplateCombobox
              templates={allTemplates}
              template={sourceTemplate}
              setTemplate={(oldTemplate, newTemplate) => setSourceTemplate(newTemplate)}
            />
            <div className="rounded-lg border border-gray-200 dark:border-gray-800">
              <RichTextEditor initialValue='' onUpdate={setSourceContent}/>
            </div>
            <div className="flex flex-row justify-end pb-8">
              <div className="text-primary">
                <div>
                  <form
                    id="translate-form"
                    onSubmit={handleSubmit}
                    className="*:mr-2"
                  >
                    <OptionFilter 
                      title="Models" 
                      options={MODELS} 
                      selectedOptions={models}
                      setSelectedOptions={(selectedOptions) => {
                        setModels([...selectedOptions]);
                      }}
                      />
                    <OptionFilter 
                      title="Target Templates" 
                      options={allTemplates.map((t) => t.title)} 
                      selectedOptions={templates.map(t => t.title)}
                      setSelectedOptions={async (selectedOptions) => {
                        let newTemplates: Template[] = [];

                        selectedOptions.forEach((o: string) => {
                          console.log(o)
                          const t = allTemplates.find((t) => t.title === o);
                          if (t) {
                            newTemplates.push(t)
                          }
                        })
                        setTemplates(newTemplates);
                      }}
                      />
                    {/* <DialogUnderTheHood /> */}
                    <Button type="submit">{isLoading ? "..." : "Translate"}</Button>
                    {/* <PopoverTranslate title="Add template" /> */}
                    {/* <PresetSelector presets={presets} /> */}
                  </form>
                </div>
              </div>
              {/* <div><Toolbar /></div> */}
            </div>
            <div>Total combinations: 2 models x 2 templates = 4</div>
            <div>Estimated tokens used: 600</div>
            <div>Sign up to run more than 2 at a time!</div>
            <div>Sign up to save your templates!</div>
          </div>
          
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {models.map((model) => {
            const templatesforModel = targets.filter((t) => t.model === model);
            
            return (
              <div className="flex items-center gap-4">
                <div className="w-16 font-medium text-primary">{model}</div>
                {templatesforModel.map((target) => (
                  <div className="mt-4 grid grid-cols-1">
                      <div>
                        <div className="flex justify-between">
                          <TemplateCombobox
                            templates={allTemplates}
                            template={target.template}
                            setTemplate={(oldTemplate, newTemplate) => {
                              const targetExists = targets.find((target) => target.model === model && target.template.title === newTemplate.title) != undefined;

                              let newTargets = [...targets];
                              if (targetExists) {
                                newTargets = newTargets.filter(target => !(target.model === model && target.template.title === oldTemplate.title));
                              } else {
                                const targetIndex = newTargets.findIndex(target => target.model === model && target.template.title === oldTemplate.title);
                                if (targetIndex !== -1) {
                                  newTargets[targetIndex].template = newTemplate;
                                }
                              }

                              setTargets(newTargets)
                            }}
                          />
                          {target.content.length > 0 && (
                            <Button variant="ghost">
                              <CopyIcon
                                className="h-4"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    target.content || "",
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
                            {target.content || ""}
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            )
          })}
          
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
      {/* <div className="flex w-full py-4">
        <Button className="ml-auto lg:hidden" type="submit">
          + Integrate with your accounts +
        </Button>
      </div> */}
    </div>
  );
}
