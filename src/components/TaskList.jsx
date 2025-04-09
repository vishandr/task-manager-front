import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  FormControlLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getTasks } from '../api';

export default function TaskList({ onSelect }) {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetch();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = showCompleted ? task.isCompleted : !task.isCompleted;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Box>
      <TextField
        label='Search'
        size='small'
        fullWidth
        margin='dense'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        }
        label='Показать выполненные'
      />
      <List>
        {filteredTasks.map((task) => (
          <ListItem button key={task.id} onClick={() => onSelect(task)}>
            <ListItemText
              primary={task.title}
              secondary={task.isCompleted ? '✅ Completed' : '❌ Not completed'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// const allTasks = [
//   {
//     id: 1,
//     title: 'Buy milk',
//     description: 'buy a carton of milk and if they have eggs, get six',
//     isCompleted: false,
//   },
//   {
//     id: 2,
//     title: 'Finish project',
//     description: 'Try to make it ready till friday',
//     isCompleted: true,
//   },
//   {
//     id: 3,
//     title: 'Walk the dog',
//     description: 'Walk with dogs twice a day',
//     isCompleted: false,
//   },
// ];
