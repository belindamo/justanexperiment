import { AlertCircle, Settings, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import UserSettingsModel from "./user-settings-model";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { AIModel } from "@/lib/types";
import { validateOpenAIKey } from "@/app/home/translate/lib/openai";
import { DialogClose } from "@radix-ui/react-dialog";
import { DEFAULT_MODELS, PREDEFINED_MODELS, TOP_MODELS } from "@/lib/constants";
import { useModelStorageContext } from "../providers/model-storage";


export default function UserSettings() {
  const { enabledModels, openAIKey, setOpenAIKey, changeModelStatus, cleanData } = useModelStorageContext()
  const [gptModels, setGPTModels] = useState<AIModel[]>([]);
  const [onTopModels, setOnTopModels] = useState<string[]>([]);
  const [openAIValue, setOpenAIValue] = useState(openAIKey);
  const [openAIKeyValid, setOpenAIKeyValid] = useState(true);
  const [openAIKeySaved, setOpenAIKeySaved] = useState(false);
  const [require1ModelError, setRequire1ModelError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Update the status of the given model
   * @param modelBase 
   * @returns 
   */
  const onModelStatusChange = (name: string, checked: boolean) => {
    const idx = PREDEFINED_MODELS.indexOf(name);
    if (idx < 0) return;

    /* Prevent removing the last model */
    if (!checked && enabledModels.length === 1) {
      setRequire1ModelError(true);
      setTimeout(() => setRequire1ModelError(false), 8000);
      return;
    }

    const model = gptModels[idx];
    model.enabled = checked;
    changeModelStatus(name, checked);
  }

  /**
   * Reload the list of models and the models on top
   */
  const reloadModelsOnTop = (oldTopModels: string[]) => {
    const newModels = PREDEFINED_MODELS.map((name) => {
      return {
        name,
        enabled: enabledModels?.includes(name) ?? true,
      };
    });
    setGPTModels(newModels);
    setOnTopModels(newModels.filter(model => model.enabled || oldTopModels.includes(model.name)).map(model => model.name));
  };

  /**
   * Load model from DB when dialog is getting opened
   * @param opened 
   */
  const onDialogOpen = (opened: any) => {
    if (opened) {
      setIsOpen(false);
      setOpenAIValue(openAIKey);
      setOpenAIKeySaved(openAIKey !== "");

      /* Reload the active models to keep them on top */
      reloadModelsOnTop([]);
    }
  }

  /**
   * Reload models everytime that enabled models get updated
   */
  useEffect(() => {
    /* Load the models from local storage when the lsit is closed */
    if (!isOpen) {
      reloadModelsOnTop(onTopModels);
    }
  }, [enabledModels, isOpen]);

  /**
   * Reload OpenAI key everytime get updated
   */
  useEffect(() => {
    onDialogOpen(true);
  }, [openAIKey]);

  /**
   * Clean the data from the DB
   */
  const callCleanData = () => {
    cleanData();
    setOpenAIValue("");
    setOpenAIKeyValid(true);
    setOpenAIKeySaved(false)
  };

  /**
   * Track the changes for the OpenAI key
   * @param evt 
   */
  const onOpenAIKeyChange = (evt: any) => {
    setOpenAIValue(evt.target.value);
    setOpenAIKeyValid(true);
    setOpenAIKeySaved(false);
  }

  /**
   * Validate and save the OpenAI key on DB
   */
  const validateSaveOpenAIKey = async () => {
    const isValid = await validateOpenAIKey(openAIValue);
    if (!isValid) {
      setOpenAIKeyValid(false);
      // setOpenAIKeySaved(false);
      return;
    }
    setOpenAIKeyValid(true);
    setOpenAIKey(openAIValue);
    setOpenAIKeySaved(true);
  };

  /**
   * Go to OpenAI API Keys
   */
  const goToOpenAI = () => {
    window.open("https://platform.openai.com/account/api-keys", "_blank");
  }

  return (
    <Dialog onOpenChange={onDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <Settings width={16} className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] sm:max-w-[425px] px-0 py-4 sm:m-0">
        <DialogHeader className="flex-row items-center justify-between px-4" style={{ height: 5 }}>
          <span className="text-muted-foreground">Settings</span>
          <DialogClose style={{ margin: 0 }}><X size={14} className="text-muted-foreground" /></DialogClose>
        </DialogHeader>
        <Separator />
        <DialogHeader className="px-4">
          <DialogTitle>Model names</DialogTitle>
          <DialogDescription>
            Configure the latest OpenAI models.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4  px-4">
          {require1ModelError && (<Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Can't disable the model</AlertTitle>
            <AlertDescription>
              You must have at least one active model.
            </AlertDescription>
          </Alert>)}
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 text-right"
          >
            <div className="grid space-y-2 ps-2 text-left">
              {gptModels.map(model => (TOP_MODELS.includes(model.name) || onTopModels.includes(model.name)) &&
                <UserSettingsModel key={`${model.name}-${model.enabled}`} model={model} onStatusChange={onModelStatusChange} />
              )}
            </div>
            <CollapsibleContent className="space-y-2 ps-2 text-left">
              {gptModels.map(model => (!TOP_MODELS.includes(model.name) && !onTopModels.includes(model.name) &&
                <UserSettingsModel key={`${model.name}-${model.enabled}`} model={model} onStatusChange={onModelStatusChange} />
              ))}
            </CollapsibleContent>
            <CollapsibleTrigger asChild>
              <Button className="text-muted-foreground ps-0 mt-0 pt-0 text-right text-xs" variant="link">
                <span className="mr-2">{isOpen ? "Show less" : "Show more"}</span>
                {isOpen ? (<ChevronUp className="h-4 w-4" />) : (<ChevronDown className="h-4 w-4" />)}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        <DialogHeader className="px-4">
          <DialogTitle>OpenAI API key</DialogTitle>
          <DialogDescription>
            <Button variant="link" className="text-muted-foreground p-0 m-0" onClick={() => goToOpenAI()}>
              Your OpenAI key
            </Button> will be stored locally on your device. We will never store your key.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4 px-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="openai-key"
              placeholder="Enter your OpenAI key"
              className="col-span-3"
              value={openAIValue}
              onChange={onOpenAIKeyChange}
            />
            <Button onClick={() => validateSaveOpenAIKey()}>{openAIKeySaved ? "..." : "Validate"}</Button>
          </div>
          <DialogDescription>
            {!openAIKeyValid &&
              <span className="text-destructive">Invalid OpenAI key</span>
            }
            {openAIKeySaved &&
              <span>OpenAI key saved</span>
            }
          </DialogDescription>
        </div>
        <DialogFooter style={{ justifyContent: "start" }} className="px-4">
          <Button className="text-muted-foreground ps-0" variant="link" onClick={() => callCleanData()}>Clean my locally stored data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
