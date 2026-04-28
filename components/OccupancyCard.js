import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function OccupancyCard({ nome, ocupacao, tempoEspera, statusDetalhado }) {
  const { theme } = useContext(AppContext);
  
  let statusColor = '#2ecc71';
  if (ocupacao >= 50 && ocupacao < 80) statusColor = '#f39c12';
  if (ocupacao >= 80) statusColor = '#ED145B';

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{nome}</Text>
        <Ionicons name="location-outline" size={16} color={theme.subText} />
      </View>

      <View style={styles.occupancyRow}>
        <Text style={[styles.percentage, { color: statusColor }]}>{ocupacao}%</Text>
        <Text style={[styles.statusLabel, { color: theme.subText }]}>Ocupado</Text>
      </View>

      <View style={[styles.progressBarBackground, { backgroundColor: theme.border }]}>
        <View style={[styles.progressBarFill, { width: `${ocupacao}%`, backgroundColor: statusColor }]} />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={14} color={theme.subText} />
        <Text style={[styles.infoText, { color: theme.subText }]}>Espera: {tempoEspera}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={14} color={theme.subText} />
        <Text style={[styles.infoText, { color: theme.subText }]} numberOfLines={2}>{statusDetalhado}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 16, padding: 16, marginBottom: 15, width: '100%', elevation: 3, borderWidth: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 15, fontWeight: '800', flex: 1 },
  occupancyRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  percentage: { fontSize: 26, fontWeight: '900', marginRight: 6, letterSpacing: -1 },
  statusLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  progressBarBackground: { height: 6, borderRadius: 3, overflow: 'hidden', marginBottom: 15 },
  progressBarFill: { height: '100%', borderRadius: 3 },
  divider: { height: 1, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  infoText: { fontSize: 12, marginLeft: 6, flex: 1, fontWeight: '500' }
});