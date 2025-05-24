import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import {
  ColorSchemeName,
  useColorScheme as useRNColorScheme,
} from "react-native";

export function useColorScheme(): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] =
    useState<NonNullable<ColorSchemeName>>("light");
  const systemColorScheme = useRNColorScheme() as NonNullable<ColorSchemeName>;

  useEffect(() => {
    setColorScheme(systemColorScheme);

    SystemUI.setBackgroundColorAsync(
      systemColorScheme === "dark" ? "#151718" : "#ffffff"
    );
  }, [systemColorScheme]);

  return colorScheme;
}
