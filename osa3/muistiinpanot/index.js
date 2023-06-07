const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
];

morgan.token('requestData', (req) => {
  return JSON.stringify(req.body);
});

const format = ':method :url :status :response-time ms - :requestData';

app.use(morgan(format));

app.get('/api/persons', (req, res) => {
  res.json(notes);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end('Phone number not found.');
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name and number are required fields' });
  }

  const existingNote = notes.find((note) => note.name === body.name);
  if (existingNote) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  const newNote = {
    id: generateRandomId(),
    name: body.name,
    number: body.number
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

app.get('/info', (req, res) => {
  const currentDate = new Date().toString();
  const info = `Phonebook has info for ${notes.length} people\n${currentDate}`;
  res.send(info);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function generateRandomId() {
  const minId = 100000;
  const maxId = 999999;
  return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
}
