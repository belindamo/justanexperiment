import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

export function SingleSelect({
  title,
  options,
  selectedOption,
  setSelectedOption,
  className,
}: {
  title: string;
  options: string[];
  selectedOption?: string;
  setSelectedOption: (selectedOption: string) => void;
  className?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`${className} h-8 border-solid justify-between px-3`} role="combobox">
          <span className="flex-1 text-left truncate">{selectedOption ?? title}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      setSelectedOption(option);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedOption === option ? "opacity-100" : "opacity-0"}`}
                    />
                    <span>{option}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
