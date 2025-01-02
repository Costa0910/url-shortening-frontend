"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { comboUrlsStats } from "@/app/dashboard/stats/page";
import { comboBoxUrlStats } from "@/types/Stats";

///
/// ComboboxShortCodes
/// Some code of this combobox are deprecated, need to upgrade to new version(react 19)
///

export function ComboboxShortCodes({
  comboState,
  setComboState,
}: {
  comboState: comboUrlsStats;
  setComboState: React.Dispatch<React.SetStateAction<comboUrlsStats>>;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelectedUrl = (url: comboBoxUrlStats) => {
    if (comboState.selectedUrl?.shortCode === url.shortCode) {
      setOpen(false);
      return;
    }

    setComboState({
      ...comboState,
      selectedUrl: url,
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
        >
          {comboState.selectedUrl
            ? comboState.selectedUrl.label
            : "Select a short URL"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search urls..." />
          <CommandList>
            <CommandEmpty>No url found.</CommandEmpty>
            <CommandGroup>
              {comboState.urlsStats.map((url) => (
                <CommandItem
                  key={url.shortCode}
                  value={url.shortCode}
                  onSelect={() => handleSelectedUrl(url)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      comboState.selectedUrl?.shortCode === url.shortCode
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {url.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
