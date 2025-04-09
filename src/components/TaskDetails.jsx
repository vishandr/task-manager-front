import { Typography, Paper } from '@mui/material';

export default function TaskDetails({ task }) {
  if (!task) {
    return <Typography>Select a task to see details</Typography>;
  }

  return (
    <Paper style={{ padding: '16px' }}>
      <Typography variant='h6'>{task.title}</Typography>
      <Typography variant='body1' sx={{ marginTop: '8px' }}>
        Description: {task.description || 'No description'}
      </Typography>
    </Paper>
  );
}
