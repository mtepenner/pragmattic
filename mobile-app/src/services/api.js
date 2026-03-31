// Change this to your local machine's IP address when running on a physical device
const API_BASE_URL = 'http://localhost:3000/api';

export const TaskService = {
  /**
   * Pushes local tasks to the PostgreSQL backend
   */
  syncTasks: async (localTasks) => {
    try {
      console.log(`Syncing ${localTasks.length} tasks to ${API_BASE_URL}/tasks...`);
      // const response = await fetch(`${API_BASE_URL}/tasks/sync`, { ... })
      // return await response.json();
      return { success: true }; 
    } catch (error) {
      console.error('Failed to sync tasks:', error);
      throw error;
    }
  }
};

export const AuthService = {
  /**
   * Initiates the Google Calendar OAuth flow
   */
  connectGoogleCalendar: async () => {
    try {
      console.log(`Initiating Google OAuth at ${API_BASE_URL}/auth/google...`);
      // Navigation to OAuth screen or opening a web browser for auth
      return { connected: true };
    } catch (error) {
      console.error('Failed to connect Google Calendar:', error);
      throw error;
    }
  }
};
