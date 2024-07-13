"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Template } from "../lib/types";

export function TemplateCombobox({
  templates,
  template,
  setTemplate,
}: {
  templates: Template[];
  template: Template;
  setTemplate: (oldTemplate: Template, newTemplate: Template) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {template.title}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" style={{ 'color': 'lightgray' }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search template..." /> */}
          {/* <CommandEmpty>No template found.</CommandEmpty> */}
          <CommandGroup>
            {templates.map((t) => (
              <CommandItem
                key={t.title}
                value={t.title}
                onSelect={(currentValue) => {
                  const newT = templates.find((t) => t.title.toLowerCase() === currentValue);
                  if (newT) {
                    setTemplate(template, newT);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    t.title === template?.title ? "opacity-100" : "opacity-0",
                  )}
                />
                {t.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
