import { test } from '@jest/globals'
import exp from 'constants'
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Matti Luukkainen',
    url: 'https://www.w3schools.com/html/',
    likes: 3,
  },
  {
    title: 'this is a test blog',
    author: 'Minna Marjaleena',
    url: 'https://www.w3schools.com/html/',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('correct amount of blog posts is returned in JSON format', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toBe(200)
  expect(response.type).toBe('application/json')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('HTML is easy')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')


  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Blog has an id property', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Markus Lehto',
    url: 'https://www.w3schools.com/html/',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Markus Laine',
    url: 'https://www.w3schools.com/html/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body.find(blog => blog.title === newBlog.title)

  expect(addedBlog.likes).toBeDefined()
  expect(addedBlog.likes).toBe(0)
})

test('if title and url properties are missing, return 400 Bad Request', async () => {
  const newBlog = {
    author: 'Markus Laine',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedBlog = {
    title: 'HTML is easy',
    author: 'Matti Luukkainen',
    url: 'https://www.w3schools.com/html/',
    likes: 5,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await api.get('/api/blogs')
  const updatedBlogAtEnd = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlogAtEnd.likes).toBe(5)
})

afterAll(async () => {
  await mongoose.connection.close()
})