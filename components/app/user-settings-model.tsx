import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AIModel } from "@/lib/types";

export default function UserSettingsModel({ model, onStatusChange }: { model: AIModel, onStatusChange?: (name: string, checked: boolean) => void }) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="col-span-3">
        {model.name}
      </Label>
      <div className="flex">
        <Switch
          checked={model.enabled}
          title={model.enabled ? "Disable the model" : "Enable the model"}
          onClick={() => onStatusChange ? onStatusChange(model.name, !model.enabled) : null} />
      </div>
    </div>
  );
}
