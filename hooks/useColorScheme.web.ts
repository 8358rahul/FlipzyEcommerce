// import { useEffect, useState } from 'react';
// import { useColorScheme as useRNColorScheme } from 'react-native';

 
// export function useColorScheme() {
//   const [hasHydrated, setHasHydrated] = useState(false);

//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   const colorScheme = useRNColorScheme();

//   if (hasHydrated) {
//     return colorScheme;
//   }

//   return 'light';
// }


// hooks/useColorScheme.ts
import * as SystemUI from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { ColorSchemeName, useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] = useState<NonNullable<ColorSchemeName>>('light');
  const systemColorScheme = useRNColorScheme() as NonNullable<ColorSchemeName>;

  useEffect(() => {
    // Set initial color scheme from system
    setColorScheme(systemColorScheme);
    
    // Set app's background color to match system UI
    SystemUI.setBackgroundColorAsync(
      systemColorScheme === 'dark' ? '#151718' : '#ffffff'
    );
  }, [systemColorScheme]);

  return colorScheme;
}