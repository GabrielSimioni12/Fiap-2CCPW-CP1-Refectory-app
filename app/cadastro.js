import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function Cadastro() {
  const router = useRouter();
  const { register, registeredUsers } = useContext(AppContext);
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [perfil, setPerfil] = useState('aluno'); // Estado do perfil
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validar = () => {
    let tempErrors = {};
    if (!nome) tempErrors.nome = "O nome é obrigatório";
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) tempErrors.email = "E-mail inválido";
    if (registeredUsers.find(u => u.email === email)) tempErrors.email = "E-mail já cadastrado";
    
    if (senha.length < 6) tempErrors.senha = "A senha deve ter no mínimo 6 caracteres";
    if (senha !== confirmaSenha) tempErrors.confirmaSenha = "As senhas não coincidem";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validar()) return;
    
    setLoading(true);
    try {
      // O await garante que o código ESPERE o AsyncStorage terminar de salvar
      const result = await register({ nome, email, senha, perfil });
      
      if (result.success) {
        setLoading(false);
        // Só redireciona quando tiver certeza que salvou
        router.replace('/'); 
      } else {
        setLoading(false);
        setErrors({ geral: result.message });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ geral: "Erro técnico ao salvar. Tente novamente." });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Criar Conta</Text>

          {errors.geral && <Text style={styles.errorGeral}>{errors.geral}</Text>}

          <Text style={styles.label}>Nome Completo</Text>
          <TextInput style={styles.input} placeholder="Seu nome" value={nome} onChangeText={setNome} />
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="usuario@dominio.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Senha (min. 6 caracteres)</Text>
          <TextInput style={styles.input} placeholder="******" secureTextEntry value={senha} onChangeText={setSenha} />
          {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput style={styles.input} placeholder="******" secureTextEntry value={confirmaSenha} onChangeText={setConfirmaSenha} />
          {errors.confirmaSenha && <Text style={styles.errorText}>{errors.confirmaSenha}</Text>}

          {/* Botões de Seleção de Perfil */}
          <Text style={styles.label}>Você é:</Text>
          <View style={styles.perfilContainer}>
            <TouchableOpacity 
              style={[styles.perfilBtn, perfil === 'aluno' && styles.perfilBtnActive]}
              onPress={() => setPerfil('aluno')}
            >
              <Ionicons name="school-outline" size={20} color={perfil === 'aluno' ? '#FFF' : '#666'} />
              <Text style={[styles.perfilText, perfil === 'aluno' && styles.perfilTextActive]}>Aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.perfilBtn, perfil === 'professor' && styles.perfilBtnActive]}
              onPress={() => setPerfil('professor')}
            >
              <Ionicons name="briefcase-outline" size={20} color={perfil === 'professor' ? '#FFF' : '#666'} />
              <Text style={[styles.perfilText, perfil === 'professor' && styles.perfilTextActive]}>Professor</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.7 }]} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Finalizar Cadastro</Text>}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { padding: 25 },
  backBtn: { marginBottom: 20, marginTop: 30, widht: 40 },
  title: { fontSize: 28, fontWeight: '900', color: '#333', marginBottom: 25 },
  label: { fontSize: 13, fontWeight: '700', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 15, height: 50, borderWidth: 1, borderColor: '#DDD', marginBottom: 5 },
  errorText: { color: '#ED145B', fontSize: 12, marginBottom: 15, fontWeight: '600' },
  errorGeral: { backgroundColor: '#ffebee', color: '#ED145B', padding: 10, borderRadius: 8, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  
  // Estilos dos botões de perfil
  perfilContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 5 },
  perfilBtn: { flex: 1, flexDirection: 'row', padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5, backgroundColor: '#FFF' },
  perfilBtnActive: { backgroundColor: '#ED145B', borderColor: '#ED145B' },
  perfilText: { color: '#666', fontWeight: 'bold', marginLeft: 8 },
  perfilTextActive: { color: '#FFF' },

  button: { backgroundColor: '#ED145B', height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});