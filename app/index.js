import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Para mensagens em vermelho

  const { login, registeredUsers, user } = useContext(AppContext);
  const router = useRouter();

  // Se o usuário já estiver logado, manda direto para a Home
  useEffect(() => {
    if (user) {
      router.replace('/home');
    }
  }, [user]);

  const handleLogin = () => {
    setErrors({});
    let tempErrors = {};

    // Validações básicas
    if (!email) tempErrors.email = "O e-mail é obrigatório";
    if (!senha) tempErrors.senha = "A senha é obrigatória";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Busca o usuário na lista de cadastrados
    const foundUser = registeredUsers.find(u => u.email === email && u.senha === senha);

    if (foundUser) {
      setLoading(true);
      // Simula um delay para mostrar o Loading Spinner
      setTimeout(() => {
        login(foundUser);
        setLoading(false);
        router.replace('/home');
      }, 1500);
    } else {
      setErrors({ geral: "E-mail ou senha incorretos." });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="fast-food" size={80} color="#ED145B" />
            <Text style={styles.appTitle}>Cantina FIAP</Text>
            <Text style={styles.appSubtitle}>Checkpoint 2</Text>
          </View>

          <View style={styles.formContainer}>
            {errors.geral && <Text style={styles.errorGeral}>{errors.geral}</Text>}

            <Text style={styles.label}>E-mail</Text>
            <TextInput 
              style={[styles.input, errors.email && styles.inputError]} 
              placeholder="usuario@dominio.com" 
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <Text style={styles.label}>Senha</Text>
            <TextInput 
              style={[styles.input, errors.senha && styles.inputError]} 
              placeholder="Sua senha secreta" 
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

            <TouchableOpacity 
              style={[styles.loginButton, loading && { opacity: 0.7 }]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Text style={styles.loginButtonText}>Entrar</Text>
                  <Ionicons name="log-in-outline" size={20} color="#FFF" />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/cadastro')}
              style={styles.registerLink}
            >
              <Text style={styles.registerLinkText}>
                Não tem uma conta? <Text style={styles.registerLinkBold}>Cadastre-se aqui</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 25 },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  appTitle: { fontSize: 28, fontWeight: '900', color: '#333', marginTop: 10 },
  appSubtitle: { fontSize: 14, color: '#777' },
  formContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 2, borderWidth: 1, borderColor: '#EEE' },
  label: { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 15, height: 50, fontSize: 16, marginBottom: 5, borderWidth: 1, borderColor: '#EAEAEA' },
  inputError: { borderColor: '#ED145B' },
  errorText: { color: '#ED145B', fontSize: 12, marginBottom: 15, fontWeight: '600' },
  errorGeral: { backgroundColor: '#ffebee', color: '#ED145B', padding: 10, borderRadius: 8, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  loginButton: { backgroundColor: '#ED145B', height: 55, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  registerLink: { marginTop: 25, alignItems: 'center' },
  registerLinkText: { color: '#666', fontSize: 14 },
  registerLinkBold: { color: '#ED145B', fontWeight: 'bold' }
});