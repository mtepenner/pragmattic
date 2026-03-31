import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function CreateTaskModal({ visible, onClose }) {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('30'); // Default 30 mins

  const handleSave = () => {
    if (!title.trim()) return;
    
    addTask({
      title,
      description,
      durationMinutes: parseInt(duration) || 30,
      dueDate: new Date().toISOString(), // Defaults to today for now
    });
    
    setTitle('');
    setDescription('');
    setDuration('30');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>New Task</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#64748B" size={24} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.inputTitle}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <TextInput
            style={styles.inputDescription}
            placeholder="Add details or Markdown..."
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <View style={styles.durationContainer}>
            <Text style={styles.label}>Timebox (minutes):</Text>
            <TextInput
              style={styles.inputDuration}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, minHeight: 400 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  inputTitle: { fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', paddingVertical: 12, marginBottom: 16 },
  inputDescription: { fontSize: 16, height: 80, textAlignVertical: 'top', color: '#475569', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, marginBottom: 16 },
  durationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  label: { fontSize: 16, color: '#475569', marginRight: 12 },
  inputDuration: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0', fontSize: 16, paddingVertical: 8, minWidth: 60, textAlign: 'center' },
  saveButton: { backgroundColor: '#3B82F6', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});
