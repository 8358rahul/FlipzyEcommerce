 
import { Colors } from '@/constants/Colors';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const getCustomTheme = (isDark: boolean) => {
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const colors = isDark ? Colors.dark : Colors.light;
  
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
    },
  };
};