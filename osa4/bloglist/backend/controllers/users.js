const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    if (!username || !name || !password) {
      return response.status(400).json({ error: 'Missing required fields' })
    }

    if (username.length < 3 || password.length < 3) {
      return response.status(400).json({ error: 'Username and password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
      .populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
      })
      .exec()

    response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const userId = request.params.id

    const user = await User.findById(userId)
      .populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
      })
      .exec()

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    response.json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const userId = request.params.id

    await Blog.deleteMany({ user: userId })
    await User.findByIdAndRemove(userId)

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
