import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useContext(AppContext);

  // Mapeamento dinâmico de cores com base no estado global do tema
  const bgColor = isDarkMode ? '#121212' : '#F8F9FA';
  const textColor = isDarkMode ? '#FFFFFF' : '#333333';
  const cardColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const borderColor = isDarkMode ? '#333333' : '#EEEEEE';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        {/* Bloco de Informações do Aluno */}
        <View style={[styles.profileSection, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DX</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: textColor }]}>Davi Xavier</Text>
            <Text style={styles.profileRM}>RM: 98765</Text>
            <Text style={styles.profileCourse}>Ciência da Computação</Text>
          </View>
        </View>

        {/* Bloco de Preferências do App */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>Preferências</Text>
        <View style={[styles.optionRow, { backgroundColor: cardColor, borderColor }]}>
          <View style={styles.optionLeft}>
            <Ionicons name="moon-outline" size={24} color={textColor} />
            <Text style={[styles.optionText, { color: textColor }]}>Modo Escuro</Text>
          </View>
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#ED145B" }}
            thumbColor={isDarkMode ? "#FFF" : "#F4F3F4"}
          />
        </View>

        {/* Bloco de Opções Adicionais */}
        <Text style={[styles.sectionTitle, { color: textColor }]}>Outras Opções</Text>
        <TouchableOpacity style={[styles.optionRow, { backgroundColor: cardColor, borderColor }]} activeOpacity={0.7}>
          <View style={styles.optionLeft}>
            <Ionicons name="receipt-outline" size={24} color={textColor} />
            <Text style={[styles.optionText, { color: textColor }]}>Histórico de Pedidos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.optionRow, { backgroundColor: cardColor, borderColor }]} activeOpacity={0.7}>
          <View style={styles.optionLeft}>
            <Ionicons name="card-outline" size={24} color={textColor} />
            <Text style={[styles.optionText, { color: textColor }]}>Métodos de Pagamento</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionRow, { backgroundColor: cardColor, borderColor, marginTop: 20 }]} activeOpacity={0.7}>
          <View style={styles.optionLeft}>
            <Ionicons name="log-out-outline" size={24} color="#ED145B" />
            <Text style={[styles.optionText, { color: '#ED145B' }]}>Sair da Conta</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { backgroundColor: '#ED145B', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  content: { padding: 20, flex: 1 },
  profileSection: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 12, borderWidth: 1, marginBottom: 30, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ED145B', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  profileInfo: { marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  profileRM: { fontSize: 14, color: '#777', fontWeight: '500' },
  profileCourse: { fontSize: 12, color: '#999', marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', marginTop: 10 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
});