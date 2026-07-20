import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/AnimatedIcon';
import AppTabs from '@/components/AppTabs';
import { TrpcProvider } from '@/trpc';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TrpcProvider>
        <AnimatedSplashOverlay />
        <AppTabs />
      </TrpcProvider>
    </ThemeProvider>
  );
}
