import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Força a barra de status a ficar escura, já que o fundo do app agora é sempre claro */}
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ajustes</Text>
      </View>

      <View style={styles.content}>
        {/* Bloco de Informações do Aluno */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DX</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Davi Xavier</Text>
            <Text style={styles.profileRM}>RM: 98765</Text>
            <Text style={styles.profileCourse}>Ciência da Computação</Text>
          </View>
        </View>

        {/* Bloco de Opções da Conta */}
        <Text style={styles.sectionTitle}>Opções da Conta</Text>
        <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
          <View style={styles.optionLeft}>
            <Ionicons name="receipt-outline" size={24} color="#333" />
            <Text style={styles.optionText}>Histórico de Pedidos</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
          <View style={styles.optionLeft}>
            <Ionicons name="card-outline" size={24} color="#333" />
            <Text style={styles.optionText}>Métodos de Pagamento</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionRow, { marginTop: 20 }]} activeOpacity={0.7}>
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
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { backgroundColor: '#ED145B', height: 90, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  content: { padding: 20, flex: 1 },
  profileSection: { backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 30, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ED145B', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  profileInfo: { marginLeft: 15 },
  profileName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#333' },
  profileRM: { fontSize: 14, color: '#777', fontWeight: '500' },
  profileCourse: { fontSize: 12, color: '#999', marginTop: 2 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', marginTop: 10, color: '#333' },
  optionRow: { backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 10 },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: 16, marginLeft: 15, fontWeight: '500', color: '#333' },
});