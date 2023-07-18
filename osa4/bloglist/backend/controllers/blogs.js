const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', {
        username: 1,
        name: 1,
      })
      .exec()

    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!request.user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id, // Assign the user as the creator of the blog
  })

  try {
    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!request.user || !blog) {
      return response.status(401).json({ error: 'invalid token or blog not found' })
    }

    if (blog.user.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized access' })
    }

    await Blog.findByIdAndRemove(request.params.id)

    // Remove the blog from the user's blogs array
    request.user.blogs = request.user.blogs.filter(b => b.toString() !== request.params.id)
    await request.user.save()

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
