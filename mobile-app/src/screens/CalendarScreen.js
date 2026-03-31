import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function CalendarScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  
  // Sort tasks by creation/due date for the agenda view
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Schedule</Text>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.agendaItem}>
            <View style={styles.timeBlock}>
              <Text style={styles.timeText}>{item.durationMinutes}m</Text>
            </View>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskStatus}>{item.status === 'DONE' ? 'Completed' : 'Scheduled'}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Your schedule is clear.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#0F172A', marginBottom: 16 },
  agendaItem: { flexDirection: 'row', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  timeBlock: { backgroundColor: '#EFF6FF', padding: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center', minWidth: 60, marginRight: 16 },
  timeText: { color: '#3B82F6', fontWeight: 'bold' },
  taskInfo: { flex: 1, justifyContent: 'center' },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#0F172A' },
  taskStatus: { fontSize: 14, color: '#64748B', marginTop: 4 },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 40 }
});
