import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrations</Text>
        
        <TouchableOpacity style={styles.integrationCard}>
          <CalendarIcon color="#DB4437" size={28} />
          <View style={styles.integrationText}>
            <Text style={styles.integrationName}>Google Calendar</Text>
            <Text style={styles.integrationStatus}>Not Connected</Text>
          </View>
          <View style={styles.connectButton}>
            <Text style={styles.connectText}>Connect</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 12 },
  integrationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  integrationText: { flex: 1, marginLeft: 16 },
  integrationName: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  integrationStatus: { fontSize: 14, color: '#94A3B8', marginTop: 2 },
  connectButton: { backgroundColor: '#EFF6FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  connectText: { color: '#3B82F6', fontWeight: 'bold' }
});
