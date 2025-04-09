import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Box display='flex' height='100vh'>
      <Box width='30%' bgcolor='#f5f5f5' p={2} overflow='auto'>
        <h1>Список задач</h1>
        <TaskList onSelect={setSelectedTask} />
      </Box>
      <Box flexGrow={1} p={2}>
        <TaskDetails task={selectedTask} />
      </Box>
    </Box>
  );
}
//     <div style={{ padding: '2rem' }}>
//       <h1>Список задач</h1>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.title} — {task.isCompleted ? '✅' : '❌'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
