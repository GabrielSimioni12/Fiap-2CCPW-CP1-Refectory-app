import { useEffect, useContext } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AppProvider, AppContext } from '../context/AppContext';

function RootLayoutNav() {
  const { user, loading } = useContext(AppContext); 
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Se ainda está lendo os dados, não faz nada

    // 1. AVISANDO O SEGURANÇA: 'cadastro' também faz parte das telas de login (auth)
    const inAuthGroup = segments.length === 0 || segments[0] === 'index' || segments[0] === 'cadastro';

    if (!user && !inAuthGroup) {
      // Se NÃO tem usuário e tentou ir pra Home/Cart, manda pro Login
      router.replace('/');
    } else if (user && inAuthGroup) {
      // Se TEM usuário logado e tentou ir pro Login/Cadastro, manda pra Home
      router.replace('/home');
    }
  }, [user, segments, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" /> 
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