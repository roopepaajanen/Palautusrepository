const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')

morgan.token('requestData', (req) => {
  return JSON.stringify(req.body)
})

const format = ':method :url :status :response-time ms - :requestData'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl);
console.log('connected to MongoDB', mongoUrl);

app.use(morgan(format))
app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response, next) => {
  console.log("get blogs");
  Blog.find({})
  .then((blogs) => {
    response.status(200).json(blogs);
  })
  .catch(error => {
    console.log("error", error)
    next(error)
  })
})

app.post('/api/blogs', (request, response, next) => {
  console.log("new blog", request.body);
  const blog = new Blog(request.body);

  blog.save()
  .then((savedBlog) => {
    //response.json(savedBlog);
    response.status(201).json(savedBlog);
  })
  .catch((error) => {
    console.log(error);
    next(error);
  });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  res.status(500).end()
}

app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
