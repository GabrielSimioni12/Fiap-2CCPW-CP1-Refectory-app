import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppContext } from '../context/AppContext';
import TabBar from '../components/TabBar';

export default function Settings() {
  const { user, logout } = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil e Ajustes</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.nome?.substring(0, 2).toUpperCase() || 'UX'}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{user?.nome || 'Usuário'}</Text>
            <Text style={styles.subText}>RM: {user?.rm || '---'}</Text>
            <Text style={styles.subText}>{user?.curso || '---'}</Text>
            <View style={[styles.badge, { backgroundColor: user?.perfil === 'professor' ? '#2ecc71' : '#ED145B' }]}>
              <Text style={styles.badgeText}>{user?.perfil?.toUpperCase() || 'ALUNO'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FFF" />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { height: 90, backgroundColor: '#FFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  profileCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ED145B', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  info: { marginLeft: 20 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { color: '#777', fontSize: 14 },
  badge: { marginTop: 5, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5, alignSelf: 'flex-start' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#ED145B', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10, marginTop: 30 },
  logoutText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 }
});