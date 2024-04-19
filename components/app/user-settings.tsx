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
import { PREDEFINED_MODELS } from "@/lib/constants";
import { AIModel } from "@/lib/types";


export default function UserSettings() {
  const [models, setModels] = useState<AIModel[]>(PREDEFINED_MODELS.map((model) => { return { name: model, enabled: true, canBeDeleted: false }; }))
  const [modelNames, setModelNames] = useState(PREDEFINED_MODELS);

  const [addingModel, setAddingModel] = useState(false);
  const [newModelName, setNewModelName] = useState('');

  /**
   * Synchronize the models to the storage
   */
  const syncModelsOnStorage = () => {

  }


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
    syncModelsOnStorage();
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
    setModels(models.map((obj) => {
      return { name: obj.name, canBeDeleted: obj.canBeDeleted, enabled: obj.name === name ? checked : obj.enabled };
    }));
    syncModelsOnStorage();
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
    setModels([...models, { name: trimed, enabled: true, canBeDeleted: true }]);
    syncModelsOnStorage();
  };


  return (
    <Dialog>
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
            Key will be stored locally on your device.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="openai-key"
              placeholder="Enter your OpenAI key"
              className="col-span-3"
            />
            <Button>Validate</Button>
          </div>
          <DialogDescription>
            Validate your key to store and use it.
          </DialogDescription>
        </div>
        <DialogFooter style={{ justifyContent: "center" }}>
          <Button variant="link">Clear my data</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
