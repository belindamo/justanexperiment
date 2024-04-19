import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AIModel } from "@/lib/types";

export default function UserSettingsModel({ model, onStatusChange, onDelete }: { model: AIModel, onStatusChange?: (name: string, checked: boolean) => void, onDelete?: (name: string) => void }) {
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
        {model.canBeDeleted &&
          <Button
            variant="link"
            style={{ maxHeight: 20 }}
            title="Delete model"
            onClick={() => onDelete ? onDelete(model.name) : null}>
            <X size={16} />
          </Button>}
      </div>
    </div>
  );
}
