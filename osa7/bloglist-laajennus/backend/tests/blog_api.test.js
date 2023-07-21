import { test } from '@jest/globals'
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

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

describe('when user is authenticated', () => {
  let token

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)

    const user = new User({
      username: 'testuser',
      passwordHash,
    })

    await user.save()

    const response = await api.post('/api/login').send({
      username: 'testuser',
      password: 'testpassword',
    })

    token = response.body.token
  })

  // Tests that require authentication
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Markus Lehto',
      url: 'https://www.w3schools.com/html/',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
  })

  test('if title and url properties are missing, return 400 Bad Request', async () => {
    const newBlog = {
      author: 'Markus Laine',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    const updatedBlogInDb = blogsAtEnd.body.find((blog) => blog.id === blogToUpdate.id)

    expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1)
  })
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

test('adding a blog fails with status code 401 Unauthorized if token is not provided', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'Tester',
    url: 'https://www.example.com',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})

