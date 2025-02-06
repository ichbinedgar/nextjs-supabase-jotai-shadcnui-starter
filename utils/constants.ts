// constants.ts
import { LucideIcon } from "lucide-react";
import { Sun, Moon, Laptop } from "lucide-react";

// Define the structure of a Theme Option
export interface ThemeOption {
  value: "light" | "dark" | "system";
  label: string;
  icon: LucideIcon;
}

// Reusable constant for icon size
export const ICON_SIZE: number = 16;

// Define theme options
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
];
