// ThemeSwitcher.tsx
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useAtom } from "jotai";
import { ICON_SIZE, THEME_OPTIONS, ThemeOption } from "@/utils/constants";
import { mountedAtom } from "@/utils/atoms/atoms";
  
const ThemeSwitcher: React.FC = () => {
  // Access the mounted state atom
  const [mounted, setMounted] = useAtom(mountedAtom);

  // Access theme and setTheme from next-themes
  const { theme, setTheme } = useTheme();

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  // Find the current theme option to display the corresponding icon
  const currentThemeOption: ThemeOption | undefined = THEME_OPTIONS.find(
    (option) => option.value === theme
  );

  const IconComponent = currentThemeOption?.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {IconComponent && (
            <IconComponent size={ICON_SIZE} className="text-muted-foreground" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value: string) => setTheme(value as "light" | "dark" | "system")}
        >
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
            <DropdownMenuRadioItem key={value} className="flex gap-2" value={value}>
              <Icon size={ICON_SIZE} className="text-muted-foreground" />
              <span>{label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
