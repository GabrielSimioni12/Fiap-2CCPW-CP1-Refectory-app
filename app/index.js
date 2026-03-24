import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [nome, setNome] = useState('');
  const [rm, setRm] = useState('');
  const [curso, setCurso] = useState('');
  const [perfil, setPerfil] = useState('aluno'); // Padrão é aluno
  
  const { login } = useContext(AppContext);
  const router = useRouter();

  const handleLogin = () => {
    // Validação básica
    if (!nome.trim() || !rm.trim() || !curso.trim()) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha seu Nome, RM/Matrícula e Curso para continuar.');
      return;
    }

    // Registra a sessão no Contexto Global
    login({ nome, rm, curso, perfil });

    // Navega para o cardápio, substituindo a rota atual para não permitir "voltar" pro login
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="fast-food" size={80} color="#ED145B" />
          <Text style={styles.appTitle}>Cantina FIAP</Text>
          <Text style={styles.appSubtitle}>Faça login para fazer seu pedido</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Davi Xavier" 
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>RM / Matrícula</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: 98765" 
            keyboardType="numeric"
            value={rm}
            onChangeText={setRm}
          />

          <Text style={styles.label}>Curso / Departamento</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ex: Ciência da Computação" 
            value={curso}
            onChangeText={setCurso}
          />

          <Text style={styles.label}>Você é:</Text>
          <View style={styles.roleSelector}>
            <TouchableOpacity 
              style={[styles.roleOption, perfil === 'aluno' && styles.roleOptionActive]}
              onPress={() => setPerfil('aluno')}
            >
              <Ionicons name="school-outline" size={20} color={perfil === 'aluno' ? "#FFF" : "#666"} />
              <Text style={[styles.roleText, perfil === 'aluno' && styles.roleTextActive]}>Aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.roleOption, perfil === 'professor' && styles.roleOptionActive]}
              onPress={() => setPerfil('professor')}
            >
              <Ionicons name="briefcase-outline" size={20} color={perfil === 'professor' ? "#FFF" : "#666"} />
              <Text style={[styles.roleText, perfil === 'professor' && styles.roleTextActive]}>Professor</Text>
            </TouchableOpacity>
          </View>
          
          {perfil === 'professor' && (
            <Text style={styles.discountBadge}>✨ Professores têm 10% de desconto!</Text>
          )}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Acessar Cardápio</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { flex: 1, justifyContent: 'center', padding: 25 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  appTitle: { fontSize: 28, fontWeight: '900', color: '#333', marginTop: 10, letterSpacing: -0.5 },
  appSubtitle: { fontSize: 14, color: '#777', marginTop: 5 },
  formContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, borderWidth: 1, borderColor: '#EEE' },
  label: { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 15, height: 50, fontSize: 16, color: '#333', marginBottom: 20, borderWidth: 1, borderColor: '#EAEAEA' },
  roleSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  roleOption: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, marginHorizontal: 4 },
  roleOptionActive: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  roleText: { fontSize: 15, fontWeight: '600', color: '#666', marginLeft: 8 },
  roleTextActive: { color: '#FFF' },
  discountBadge: { textAlign: 'center', color: '#2ecc71', fontWeight: 'bold', fontSize: 13, marginBottom: 15 },
  loginButton: { backgroundColor: '#ED145B', height: 55, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
});