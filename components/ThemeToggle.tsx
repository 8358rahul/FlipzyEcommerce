import { useTheme } from '@/contexts/ThemeContext';
import { Switch, View } from 'react-native';
import { ms, s } from 'react-native-size-matters';
import { ThemedText } from './ThemedText';

export function ThemeToggle() {
  const { theme, toggleTheme, isSystemTheme, setIsSystemTheme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: ms(5) }}>
      <ThemedText style={{ marginRight: s(6) }}>
        {theme === 'dark' ? 'Dark' : 'Light'}
      </ThemedText>
      <Switch 
            value={theme === 'dark'}
          onValueChange={toggleTheme} 
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={theme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
}