import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      {/* headerShown: false remove o cabeçalho padrão nativo para criarmos o nosso customizado */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </AppProvider>
  );
}