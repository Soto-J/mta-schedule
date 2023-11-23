"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { subwayLines } from "./subway-lines";

export function DropdownSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? (
            <Image
              src={`${subwayLines.find((line) => line.value === value)?.label}`}
              alt={value}
              width={20}
              height={20}
            />
          ) : (
            "Select subway line..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subway lines..." />
          <CommandEmpty>No Subways found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-64">
              {subwayLines.map((line) => (
                <CommandItem
                  key={line.value}
                  value={line.value}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value ? "" : currentValue.toUpperCase()
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === line.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <Image
                    src={`${line.label}`}
                    alt={line.value}
                    width={20}
                    height={20}
                  />
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
