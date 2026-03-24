import { useEffect, useContext } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AppProvider, AppContext } from '../context/AppContext';

function RootLayoutNav() {
  const { user } = useContext(AppContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está na área de "auth" (Login) ou dentro do app
    const inAuthGroup = segments.length === 0 || segments[0] === 'index';

    if (!user && !inAuthGroup) {
      // 1. Se NÃO tem usuário e NÃO está no login, manda pro Login
      router.replace('/');
    } else if (user && inAuthGroup) {
      // 2. Se TEM usuário e tentou ir pro Login, manda pra Home
      router.replace('/home');
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <RootLayoutNav />
    </AppProvider>
  );
}