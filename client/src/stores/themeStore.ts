import { create } from "zustand";
import { devtools } from "zustand/middleware";

//Zustand: State Management Library (like Redux) 
export interface ThemeState {
  isDarkMode: boolean;
}
export interface themesActions {
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const useThemeStore = create<ThemeState & themesActions>()(
  devtools(
    (set) => ({
      isDarkMode: false,

      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
