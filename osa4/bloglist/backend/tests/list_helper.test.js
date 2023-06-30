const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  const listWithBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expected)
  })

  test('returns null if the list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeNull()
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: 'Robert C. Martin', blogs: 3 },
    { author: 'Michael Chan', blogs: 2 },
    { author: 'Martin Fowler', blogs: 5 },
    { author: 'Michael Chan', blogs: 1 }
  ]

  test('returns the author with the most blogs and the blog count', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Martin Fowler',
      blogs: 5
    }
    expect(result).toEqual(expected)
  })

  test('returns null if the list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })
})

describe('most likes', () => {
  const blogs = [
    {
      author: 'Robert C. Martin',
      likes: 10,
    },
    {
      author: 'Michael Chan',
      likes: 5,
    },
    {
      author: 'Martin Fowler',
      likes: 7,
    },
    {
      author: 'Michael Chan',
      likes: 12,
    },
  ]

  test('returns the author with the most likes and the total like count', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Michael Chan',
      likes: 17,
    }
    expect(result).toEqual(expected)
  })

  test('returns null if the list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBeNull()
  })
})