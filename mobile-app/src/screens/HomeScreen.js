import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTaskStore } from '../store/useTaskStore';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';

export default function HomeScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const [modalVisible, setModalVisible] = useState(false);

  // Separate tasks into active and completed
  const activeTasks = tasks.filter(t => t.status !== 'DONE');
  const completedTasks = tasks.filter(t => t.status === 'DONE');

  return (
    <View style={styles.container}>
      <FlatList
        data={[...activeTasks, ...completedTasks]} // Show active first
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Tap + to add one!</Text>}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Plus color="#FFFFFF" size={32} />
      </TouchableOpacity>

      <CreateTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16 },
  listContent: { paddingVertical: 20, paddingBottom: 100 },
  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 },
  fab: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#3B82F6', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 6 }
});
