import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Circle, CheckCircle2, Clock, Trash2 } from 'lucide-react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskCard({ task }) {
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const isDone = task.status === 'DONE';

  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      <TouchableOpacity onPress={() => toggleTaskStatus(task.id)} style={styles.checkboxContainer}>
        {isDone ? <CheckCircle2 color="#10B981" size={24} /> : <Circle color="#94A3B8" size={24} />}
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, isDone && styles.textDone]}>{task.title}</Text>
        {task.description ? <Text style={[styles.description, isDone && styles.textDone]} numberOfLines={2}>{task.description}</Text> : null}
        <View style={styles.metaContainer}>
          <Clock color="#64748B" size={14} />
          <Text style={styles.metaText}>{task.durationMinutes} min timebox</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
        <Trash2 color="#EF4444" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardDone: { backgroundColor: '#F8FAFC', opacity: 0.7 },
  checkboxContainer: { marginRight: 12, paddingTop: 2 },
  contentContainer: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#0F172A', marginBottom: 4 },
  description: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  textDone: { color: '#94A3B8', textDecorationLine: 'line-through' },
  metaContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 12, color: '#64748B', marginLeft: 4 },
  deleteButton: { justifyContent: 'center', paddingLeft: 12 }
});
