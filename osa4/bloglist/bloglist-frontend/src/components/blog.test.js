import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog Component', () => {
  
  const blog = {
    title: 'Test Blog',
    author: 'Juuso justiinsa',
    url: 'https://example.com',
    likes: 10,
    user: {
      name: 'Matti meikalainen',
    },
  }

  test('renders title and author by default', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container.querySelector('.blog-url')).not.toBeInTheDocument()
    expect(component.container.querySelector('.blog-likes')).not.toBeInTheDocument()
  })


  test('renders URL and number of likes when button is clicked', () => {
    const component = render(<Blog blog={blog} />)
    const button = component.getByText('View')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('calls the event handler with the right details when a new blog is created', () => {
    const addBlog = jest.fn()
    const component = render(<BlogForm addBlog={addBlog} />)
    const titleInput = component.getByLabelText('Title')
    const authorInput = component.getByLabelText('Author')
    const urlInput = component.getByLabelText('URL')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'John Doe' } })
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })

    fireEvent.submit(component.container.querySelector('form'))

    expect(addBlog).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
    })
  })

  describe('BlogForm Component', () => {
    test('calls the event handler with the right details when a new blog is created', () => {
      const mockAddBlogHandler = jest.fn()
      const component = render(<BlogForm addBlog={mockAddBlogHandler} />)
      const titleInput = component.container.querySelector('#title')
      const authorInput = component.container.querySelector('#author')
      const urlInput = component.container.querySelector('#url')
      const form = component.container.querySelector('form')

      fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
      fireEvent.change(authorInput, { target: { value: 'John Doe' } })
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
      fireEvent.submit(form)

      expect(mockAddBlogHandler.mock.calls).toHaveLength(1)
      expect(mockAddBlogHandler.mock.calls[0][0]).toEqual({
        title: 'Test Blog',
        author: 'Juuso justiinsa',
        url: 'https://example.com',
      })
    })
  })
})
