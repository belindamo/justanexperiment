"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Template } from "../lib/types"

export function TemplateCombobox({ templates, template = null, setTemplate }: { templates: Template[], template: Template | null, setTemplate: (template: Template) => void}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {template ?
            template.title
            : "Select template..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search template..." /> */}
          {/* <CommandEmpty>No template found.</CommandEmpty> */}
          <CommandGroup>
            {templates.map((t) => (
              <CommandItem
                key={t.id}
                value={t.id}
                onSelect={(currentValue) => {
                  const newT = templates.find((t) => t.id === currentValue)
                  if (newT) {
                    setTemplate(newT)
                  }
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    t.id === template?.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {t.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
