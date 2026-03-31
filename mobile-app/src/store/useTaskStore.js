import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Design Database Schema',
      description: 'Map out PostgreSQL tables for Users, Tasks, and Google Events.',
      dueDate: new Date().toISOString(),
      durationMinutes: 60,
      status: 'TODO',
    },
    {
      id: '2',
      title: 'Setup Google OAuth',
      description: 'Get client ID and configure refresh tokens.',
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      durationMinutes: 120,
      status: 'IN_PROGRESS',
    },
  ],
  
  // Action to toggle task completion
  toggleTaskStatus: (taskId) => set((state) => ({
    tasks: state.tasks.map((task) => {
      if (task.id === taskId) {
        return { 
          ...task, 
          status: task.status === 'DONE' ? 'TODO' : 'DONE' 
        };
      }
      return task;
    }),
  })),
}));
