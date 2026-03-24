import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OccupancyCard({ nome, ocupacao, tempoEspera, statusDetalhado }) {
  // Lógica de termômetro de cores baseada na ocupação
  let statusColor = '#2ecc71'; // Verde (Tranquilo)
  if (ocupacao >= 50 && ocupacao < 80) statusColor = '#f39c12'; // Amarelo/Laranja (Moderado)
  if (ocupacao >= 80) statusColor = '#ED145B'; // Vermelho (Lotado)

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={1}>{nome}</Text>
        <Ionicons name="location-outline" size={16} color="#666" />
      </View>

      <View style={styles.occupancyRow}>
        <Text style={[styles.percentage, { color: statusColor }]}>{ocupacao}%</Text>
        <Text style={styles.statusLabel}>Ocupado</Text>
      </View>

      {/* Barra de Progresso Visual */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${ocupacao}%`, backgroundColor: statusColor }]} />
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={14} color="#666" />
        <Text style={styles.infoText}>Espera: {tempoEspera}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="information-circle-outline" size={14} color="#666" />
        <Text style={styles.infoText} numberOfLines={2}>{statusDetalhado}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    width: '100%',
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#333',
    flex: 1,
  },
  occupancyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  percentage: {
    fontSize: 26,
    fontWeight: '900',
    marginRight: 6,
    letterSpacing: -1,
  },
  statusLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    flex: 1,
    fontWeight: '500',
  }
});