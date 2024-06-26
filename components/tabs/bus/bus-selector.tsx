import { useState } from "react";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export const BusSelector = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const BUS_LIST = [
    {
      value: "Bx1",
      label: "Bx1",
    },
    {
      value: "Bx2",
      label: "Bx",
    },
    {
      value: "Bx3",
      label: "1",
    },
    {
      value: "1",
      label: "1",
    },
  ];

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? BUS_LIST.find((bus) => bus.value === value)?.label
              : "Select bus..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search bus..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {BUS_LIST.map((bus) => (
                <CommandItem
                  key={bus.value}
                  value={bus.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === bus.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {bus.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
