import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (title, description) => {
  const response = await api.post('/tasks', { title, description });
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

export const updateTask = async (id, updates) => {
  const response = await api.patch(`/tasks/${id}`, updates);
  return response.data;
};
