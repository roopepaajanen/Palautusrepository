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

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => {
      console.log(error);
      next(error); // Pass the error to the error handler
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => {
    console.log(error);
    if (error.name === 'CastError') {
      response.status(400).send({ error: 'malformatted id' });
    } else {
      response.status(500).end();
    }
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id).then(() => {
    res.status(204).end();
  }).catch(error => {
    console.log(error);
    res.status(500).end();
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'Name missing' });
  }

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, { $set: person }, { new: true })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      next(error); // Pass the error to the error handler
    });
});


app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'Name missing' });
  }
  if (body.name.length < 4) {
    return response.status(400).json({ error: 'Name must be at least 3 characters long' });
  }
  if (/[a-zA-Z]/.test(body.number)) {
    return response.status(400).json({ error: 'Number must only contain numbers' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch(error => {
      console.log(error);
      next(error); // Pass the error to the error handler
    });
});

app.get('/info', async (req, res) => {
  try {
    const count = await Person.countDocuments({});
    const currentDate = new Date().toString();
    const info = `Phonebook has info for ${count} people\n${currentDate}`;
    res.send(info);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
});

// Error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).end();
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
