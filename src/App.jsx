import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import { getTasks } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSaveHandler = () => {
    fetchTasks();
    setSelectedTask(null);
  };

  return (
    <Box display='flex' height='100vh'>
      <Box width='30%' bgcolor='#f5f5f5' p={2} overflow='auto'>
        <h1>Список задач</h1>
        <Button onClick={() => setSelectedTask({})} variant='contained'>
          Create a task
        </Button>
        <TaskList tasks={tasks} onSelect={setSelectedTask} />
      </Box>
      <Box flexGrow={1} p={2}>
        <TaskDetails task={selectedTask} onSave={onSaveHandler} />
      </Box>
    </Box>
  );
}

export default App;
