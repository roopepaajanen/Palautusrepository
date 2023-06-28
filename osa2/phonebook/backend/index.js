const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.use(express.static('build'));

const cors = require('cors');
app.use(cors());

const Person = require('./models/mongo');

morgan.token('requestData', (req) => {
  return JSON.stringify(req.body);
});

const format = ':method :url :status :response-time ms - :requestData';

app.use(morgan(format));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.deleteOne({ _id: id }).then(() => {
    res.status(204).end();
  });
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'Name missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  });
});

app.get('/info', (req, res) => {
  Person.countDocuments({}, (err, count) => {
    const currentDate = new Date().toString();
    const info = `Phonebook has info for ${count} people\n${currentDate}`;
    res.send(info);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
