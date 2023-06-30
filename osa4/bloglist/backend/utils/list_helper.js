const lodash = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favorite = blogs.find(blog => blog.likes === maxLikes)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  console.log(blogs)

  const blogCounts = lodash.countBy(blogs, 'author')
  console.log(blogCounts)

  const sortedAuthors = lodash.orderBy(lodash.keys(blogCounts), (author) => blogCounts[author], ['desc']);

  console.log(sortedAuthors)
  return {
    author: sortedAuthors[0],
    blogs: blogCounts[sortedAuthors[0]]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = {}

  blogs.forEach((blog) => {
    if (likesByAuthor[blog.author]) {
      likesByAuthor[blog.author] += blog.likes
    } else {
      likesByAuthor[blog.author] = blog.likes
    }
  })

  const authors = Object.keys(likesByAuthor)
  const authorWithMostLikes = authors.reduce((maxAuthor, author) => {
    if (likesByAuthor[author] > likesByAuthor[maxAuthor]) {
      return author
    }
    return maxAuthor
  })

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
