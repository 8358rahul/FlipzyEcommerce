import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { getCustomTheme } from "@/utils/navigationThemes";
import {
  ThemeProvider as RNThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

function ThemedNavigation() {
  const { theme } = useTheme();
    const navigationTheme = getCustomTheme(theme === 'dark');

  
  return (
   <RNThemeProvider value={navigationTheme}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false , 


          
        }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="wishlist" options={{ title: "Wishlist" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'}/>
      <Toast />
    </RNThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <ThemedNavigation />
    </ThemeProvider>
  );
}