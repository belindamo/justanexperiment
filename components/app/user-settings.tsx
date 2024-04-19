import { Settings, Plus } from "lucide-react";
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
import UserSettingsModel from "./user-settings-model";
import { useState } from "react";
import { AIModel } from "@/lib/types";
import ModelStorage from "@/lib/models-storage";
import { validateOpenAIKey } from "@/app/home/translate/lib/openai";


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


  return (
    <Dialog onOpenChange={onDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <Settings width={16} className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Just an experiment - Settings</DialogTitle>
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>Model names</DialogTitle>
          <DialogDescription>
            Configure the latest OpenAI models.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
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
        <DialogHeader>
          <DialogTitle>OpenAI key</DialogTitle>
          <DialogDescription>
            Key will be stored locally on your device. Validate your key to store and use it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
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
        <DialogFooter style={{ justifyContent: "center" }}>
          <Button variant="link" onClick={() => cleanData()}>Clean my data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
