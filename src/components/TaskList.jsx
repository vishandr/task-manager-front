import {
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function TaskList({ tasks, onSelect }) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [search, setSearch] = useState('');

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
      {filteredTasks.length === 0 ? (
        <Typography variant='body2' color='text.secondary'>
          Задач не найдено.
        </Typography>
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <ListItem button key={task.id} onClick={() => onSelect(task)}>
              <ListItemText
                primary={task.title}
                secondary={
                  task.isCompleted ? '✅ Completed' : '❌ Not completed'
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
