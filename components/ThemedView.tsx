import { useTheme } from '@/contexts/ThemeContext';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string; 
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor,  
  ...otherProps 
}: ThemedViewProps) {
  const { theme,colors } = useTheme();  

  return <View style={[{ backgroundColor:colors.background}, style]} {...otherProps} />;
}