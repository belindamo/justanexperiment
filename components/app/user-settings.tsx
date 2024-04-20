import { Settings, Plus, X } from "lucide-react";
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import UserSettingsModel from "./user-settings-model";
import { useState } from "react";
import { AIModel } from "@/lib/types";
import ModelStorage from "@/lib/models-storage";
import { validateOpenAIKey } from "@/app/home/translate/lib/openai";
import Link from "next/link";
import { DialogClose } from "@radix-ui/react-dialog";


export default function UserSettings() {
  const [models, setModels] = useState<AIModel[]>([])
  const [modelNames, setModelNames] = useState<string[]>([]);

  const [addingModel, setAddingModel] = useState(false);
  const [newModelName, setNewModelName] = useState('');

  const [openAIKey, setOpenAIKey] = useState('');
  const [openAIKeyValid, setOpenAIKeyValid] = useState(true);
  const [openAIKeySaved, setOpenAIKeySaved] = useState(false);


  /**
   * Delte the given model
   * @param name 
   * @returns 
   */
  const onModelDelete = (name: string) => {
    const idx = modelNames.indexOf(name);
    if (idx < 0 || !models[idx].canBeDeleted) return;
    console.log("Model delete ", name)
    setModels(models.filter((obj) => {
      return obj.name !== name;
    }));
    ModelStorage.delete(name);
  }

  /**
   * Update the status of the given model
   * @param name 
   * @param checked 
   * @returns 
   */
  const onModelStatusChange = (name: string, checked: boolean) => {
    const idx = modelNames.indexOf(name);
    if (idx < 0) return;
    const model = models[idx];
    model.enabled = checked;
    setModels(models.map((obj) => {
      return obj.name === name ? model : obj;
    }));
    ModelStorage.addUpdate(model);
  }

  /**
   * Set to add new model
   */
  const addNewModel = () => {
    setNewModelName('');
    setAddingModel(true);
  };

  /**
   * Track the changes for the new model name
   * @param evt 
   */
  const onModelNameChange = (evt: any) => {
    setNewModelName(evt.target.value);
  }

  /**
   * Register new model
   * @returns 
   */
  const saveNewModel = () => {
    setAddingModel(false);

    /* Check that model is valid and was not added previously */
    const trimed = newModelName.trim()
    if (trimed.length === 0 || modelNames.includes(trimed)) return;

    /* Add the new model */
    setModelNames([...modelNames, trimed]);
    const model = { name: trimed, enabled: true, canBeDeleted: true };
    setModels([...models, model]);
    ModelStorage.addUpdate(model);
  };

  /**
   * Load model from DB when dialog is getting opened
   * @param opened 
   */
  const onDialogOpen = async (opened: any) => {
    if (opened) {
      setOpenAIKeySaved(false)

      /* Read the models from DB */
      const dbModels = await ModelStorage.getAll();
      setModelNames(dbModels.map((model) => model.name));
      setModels(dbModels);

      /* Read the keys from DB */
      const dbKeys = await ModelStorage.getAllKeys();
      for (const key of dbKeys) {
        if (key.provider === 'openai') {
          setOpenAIKey(key.key);
        }
      }
    }
  }

  /**
   * Clean the data from the DB
   */
  const cleanData = async () => {
    await ModelStorage.cleanKeys()
    setOpenAIKey('');
    await ModelStorage.clean()
    await onDialogOpen(true);
    setOpenAIKeyValid(true);
    setOpenAIKeySaved(false)
  }

  /**
   * Track the changes for the OpenAI key
   * @param evt 
   */
  const onOpenAIKeyChange = (evt: any) => {
    setOpenAIKey(evt.target.value);
    setOpenAIKeyValid(true);
  }

  /**
   * Validate and save the OpenAI key on DB
   */
  const validateSaveOpenAIKey = async () => {
    const isValid = await validateOpenAIKey(openAIKey);
    if (!isValid) {
      setOpenAIKeyValid(false);
      return;
    }
    setOpenAIKeyValid(true);
    ModelStorage.setKey('openai', openAIKey);
    setOpenAIKeySaved(true);
    setTimeout(() => setOpenAIKeySaved(false), 3000);
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
          {models.map(model => (
            <UserSettingsModel key={model.name} model={model} onStatusChange={onModelStatusChange} onDelete={onModelDelete} />
          ))}
          {!addingModel &&
            <Button
              variant="link"
              size="sm"
              style={{ textDecoration: "none" }}
              onClick={() => addNewModel()}
            >
              <Plus className="mr-2" size={16} />Add new model
            </Button>
          }
          {addingModel &&
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="new-model-name"
                placeholder="New model name"
                className="col-span-3"
                value={newModelName}
                onChange={onModelNameChange}
              />
              <Button onClick={() => saveNewModel()}>Add</Button>
            </div>
          }
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
              value={openAIKey}
              onChange={onOpenAIKeyChange}
            />
            <Button onClick={() => validateSaveOpenAIKey()}>Validate</Button>
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
          <Button className="text-muted-foreground ps-0" variant="link" onClick={() => cleanData()}>Clean my locally stored data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
