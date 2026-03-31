import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  // We can keep your mock data so the app isn't empty on first load
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
  
  // Action to add a new task from the modal
  addTask: (newTask) => set((state) => ({
    tasks: [
      ...state.tasks, 
      {
        ...newTask,
        id: Math.random().toString(36).substring(7), // Generates a random ID for frontend testing
        status: 'TODO',
        createdAt: new Date().toISOString()
      }
    ]
  })),

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

  // Action to delete a task
  deleteTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId)
  }))
}));
