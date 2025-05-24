import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.light;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  setIsSystemTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: Colors.light,
  setTheme: () => {},
  toggleTheme: () => {},
  isSystemTheme: true,
  setIsSystemTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    systemColorScheme === "dark" ? "dark" : "light"
  );
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    if (isSystemTheme) {
      setTheme(systemColorScheme === "dark" ? "dark" : "light");
    }
  }, [systemColorScheme, isSystemTheme]);

  const colors = theme === "light" ? Colors.light : Colors.dark;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setIsSystemTheme(false);
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsSystemTheme(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        setTheme: handleSetTheme,
        toggleTheme,
        isSystemTheme,
        setIsSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
