import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";


export interface ThemeState {
    isDarkMode: boolean;

  }
  export interface themesActions {
    setIsDarkMode: (isDarkMode: boolean) => void;
   
  }

  export const useThemeStore = create<ThemeState & themesActions>()(
    devtools(
      persist(
        (set) => ({
            isDarkMode: false,
      
            setIsDarkMode: (isDarkMode) => set({ isDarkMode })
        }),
        {
          name: "theme-storage",
        }
      )
    )
  );
  
  export default useThemeStore;