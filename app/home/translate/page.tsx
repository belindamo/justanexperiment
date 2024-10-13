"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { OptionFilter } from "@/app/home/translate/components/option-filter";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TemplateCombobox } from "./components/template-combobox";
import { getSystemMessage } from "./lib/ai";
import { TEMPLATES } from "./lib/constants";
import { sendMessageToOpenAI } from "./lib/openai";
import { Template } from "./lib/types";
import RichTextEditor from "./components/rich-text-editor";
import { useModelStorageContext } from "@/components/providers/model-storage";
import useWindowSize from '@/lib/hooks/use-window-size';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/form/loading-spinner";
import { toast } from "sonner"

const allTemplates = TEMPLATES;

export default function Translate() {
  const { enabledModels, openAIKey } = useModelStorageContext();
  const { isMD, isXS } = useWindowSize();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [sourceContent, setSourceContent] = useState<string>('');
  const [sourceTemplate, setSourceTemplate] = useState<Template>(allTemplates[0]);

  // Current selected models and templates
  const [models, setModels] = useState<string[]>([]);
  const [templates, setTemplates] = useState<Template[]>([allTemplates[1]]);

  // Current models, templates and data used for grid
  const [usedModels, setUsedModels] = useState<string[]>([]);
  const [usedTemplates, setUsedTemplates] = useState<Template[]>([]);
  const [gridData, setGridData] = useState<{ [k: string]: string }>({});

  // Set the initial selecte model
  useEffect(() => {
    if (enabledModels.length > 0) {
      setModels([enabledModels[0]]);
    }
  }, [enabledModels])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (!openAIKey) {
      toast.error("Before using the tool, please enter an OpenAI key in the settings.")
      return;
    }

    if (models.length === 0 || templates.length === 0) {
      toast.error("Please select at least one model and one template.")
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setUsedModels(models.filter((m) => !!m));
    setUsedTemplates(templates);

    // Clear previous data
    Object.keys(gridData).forEach((key) => {
      delete gridData[key];
    });
    setGridData({ ...gridData });

    const promises: any = [];
    templates.forEach((template) => {
      models.forEach((model) => {
        if (!model || !template) {
          return;
        }
        promises.push(sendMessageToOpenAI(
          openAIKey,
          model,
          sourceContent,
          (messageChunk: string) => {
            gridData[`${model}-${template.title}`] = messageChunk;
            setGridData({ ...gridData });
          },
          getSystemMessage(sourceTemplate, template)
        ));
      });
    });

    await Promise.all(promises)
      .catch(() => {
        setIsError(true);
        toast.error("An error ocurred with OpenAI. Please review your key and try again.");
      }).finally(() => {
        setIsLoading(false);
        console.log('finish')
      });
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

  const returnPanels = (leftTop: React.ReactNode, rigthBottom: React.ReactNode) => {
    return !isMD ? (
      <ResizablePanelGroup direction="horizontal" className="*:mx-4">
        <ResizablePanel>
          <div className={`${usedModels.length > 0 && usedTemplates.length > 0 ? 'w-full' : 'w-6/12'} mx-auto`}>
            {leftTop}
          </div>
        </ResizablePanel>
        {usedModels.length > 0 && usedTemplates.length > 0 && (<>
          <ResizableHandle />
          <ResizablePanel className="py-4 pr-8" style={{ overflowY: 'auto', marginRight: '0' }}>
            {rigthBottom}
          </ResizablePanel>
        </>)}
      </ResizablePanelGroup>
    ) : (<div className="flex flex-col mb-4 overflow-y-auto">
      <div>
        {leftTop}
      </div>
      <div className="w-full max-w-[100%]">
        {rigthBottom}
      </div>
    </div>);
  }

  return (
    <div className={`w-full h-full px-8 ${isMD ? '' : 'pr-0'}`}>
      {/* <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div> */}
      {returnPanels((
        <div className="grid gap-4 mt-4">
          <TemplateCombobox
            templates={allTemplates}
            template={sourceTemplate}
            setTemplate={(oldTemplate, newTemplate) => setSourceTemplate(newTemplate)}
          />
          <div className="rounded-lg border border-gray-200 dark:border-gray-800">
            <RichTextEditor value={sourceContent} onUpdate={setSourceContent} />
          </div>
          <div className="flex flex-row justify-end pb-8">
            <div className="text-primary">
              <div>
                <form
                  id="translate-form"
                  onSubmit={(e) => handleSubmit(e)}
                  className="*:mr-2 *:mb-2"
                >
                  <OptionFilter
                    title="Models"
                    options={enabledModels}
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
          {/* <div>Total combinations: 2 models x 2 templates = 4</div>
            <div>Estimated tokens used: 600</div>
            <div>Sign up to run more than 2 at a time!</div>
            <div>Sign up to save your templates!</div> */}
        </div>), (<>
          {usedTemplates.map((template, i) => {
            return (<Card key={`template-result-${i}`} className={i > 0 ? 'mt-4' : ''}>
              <CardHeader className="pb-0">
                <CardTitle>{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row w-full overflow-auto">
                  {usedModels.map((model, j) => {
                    return (
                      <div key={`${model}-${template.title}-${i}`} className={`min-h-[100px] resize-none border-0 p-4 text-base font-normal ${usedModels.length === 1 ? 'w-full' : (usedModels.length === 2 && !isXS ? 'w-1/2 min-w-1/2 max-w-1/2' : (usedModels.length === 3 && !isMD ? 'w-1/3 min-w-1/3 max-w-1/3' : (isXS ? 'w-9/12 min-w-9/12 max-w-9/12' : 'w-[350px] min-w-[350px] max-w-[350px]')))}`}>
                        <h4 className="font-semibold leading-none tracking-tight">{model}</h4>
                        {isError ? (<p>Oops, looks like there was an error from the model provider. Try rerunning!</p>) : gridData[`${model}-${template.title}`] ? (<p>{gridData[`${model}-${template.title}`]}</p>) : (<LoadingSpinner />)}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>);
          })}
        </>
      ))}
      {/* <div className="hidden lg:block pl-8 self-center"><Button>+</Button></div> */}
      {/* {"GPT logs: \n" + JSON.stringify(messages)} */}
      {/* <div className="flex w-full py-4">
        <Button className="ml-auto lg:hidden" type="submit">
          + Integrate with your accounts +
        </Button>
      </div> */}
    </div>
  );
}
