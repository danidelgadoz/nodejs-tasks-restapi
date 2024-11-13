const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000

app.use(express.json())

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (title === undefined || completed === undefined) {
    res.status(400).send();
  }

  if (typeof title !== 'string') {
    res.status(400).send('invalid "title" field');
  }

  if (typeof completed !== 'boolean') {
    res.status(400).send('invalid "completed" field');
  }

  const task = {
    id: uuidv4(),
    title: title,
    completed: completed,
  }
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { title, completed } = req.body;
  if (title === undefined || completed === undefined) {
    res.status(400).send();
  }

  if (typeof title !== 'string') {
    res.status(400).send('invalid "title" field');
  }

  if (typeof completed !== 'boolean') {
    res.status(400).send('invalid "completed" field');
  }

  const id = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === id);

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    completed,
  };
  res.json(tasks[taskIndex]);
})

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter(task => task.id !== id);
  res.json();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
