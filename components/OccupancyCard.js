import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OccupancyCard({ nome, ocupacao }) {
  const isFull = ocupacao > 70;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{nome}</Text>
      <Text style={[styles.percentage, { color: isFull ? '#ED145B' : '#2ecc71' }]}>{ocupacao}%</Text>
      <Text style={styles.status}>{isFull ? 'Lotada' : 'Tranquila'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, width: '48%', alignItems: 'center', borderWidth: 1, borderColor: '#EEE' },
  label: { fontSize: 11, color: '#666', fontWeight: 'bold' },
  percentage: { fontSize: 22, fontWeight: 'bold', marginVertical: 2 },
  status: { fontSize: 10, color: '#999', textTransform: 'uppercase' }
});