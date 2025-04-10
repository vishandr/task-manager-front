import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
} from '@mui/material';

export default function TaskDetails({ task }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsCompleted(task.isCompleted);
    }
  }, [task]);

  if (!task) {
    return <Typography>Select a task to see details</Typography>;
  }

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, isCompleted }),
      });
      alert('Задача обновлена!');
    } catch (error) {
      alert('Ошибка при обновлении задачи');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Удалить эту задачу?');
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      });
      alert('Задача удалена!');
      window.location.reload(); // или обновить список через проп
    } catch (error) {
      alert('Ошибка при удалении');
      console.error(error);
    }
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <TextField
        label='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField
        label='Описание'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        }
        label='Выполнено'
      />
      <Box display='flex' gap={2}>
        <Button variant='contained' color='primary' onClick={handleSave}>
          Сохранить
        </Button>
        <Button variant='outlined' color='error' onClick={handleDelete}>
          Удалить
        </Button>
      </Box>
    </Box>
  );
}
