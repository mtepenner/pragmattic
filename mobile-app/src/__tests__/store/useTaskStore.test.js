import { useTaskStore } from '../../store/useTaskStore';

describe('useTaskStore', () => {
  beforeEach(() => {
    // Reset the store to an empty state before each test
    useTaskStore.setState({ tasks: [] });
  });

  it('should add a new task', () => {
    const { addTask } = useTaskStore.getState();
    
    addTask({
      title: 'Write unit tests',
      description: 'Test the Zustand store',
      durationMinutes: 30,
    });

    const tasks = useTaskStore.getState().tasks;
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Write unit tests');
    expect(tasks[0].status).toBe('TODO');
  });

  it('should toggle a task status between TODO and DONE', () => {
    useTaskStore.setState({
      tasks: [{ id: 'task-1', title: 'Test Task', status: 'TODO' }]
    });

    const { toggleTaskStatus } = useTaskStore.getState();
    
    // Toggle to DONE
    toggleTaskStatus('task-1');
    expect(useTaskStore.getState().tasks[0].status).toBe('DONE');

    // Toggle back to TODO
    toggleTaskStatus('task-1');
    expect(useTaskStore.getState().tasks[0].status).toBe('TODO');
  });
});
