import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
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
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('renders URL and number of likes when button is clicked', () => {
    const component = render(<Blog blog={blog} />)
    const button = component.getByText('View')
    fireEvent.click(button) // simulate button click
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('calls the event handler with the right details when a new blog is created', () => {
    const mockAddBlogHandler = jest.fn()
    const component = render(<BlogForm addBlog={mockAddBlogHandler} />)
    const titleInput = component.container.querySelector('#blogTitle')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.getByTestId('blog-form')

    fireEvent.change(titleInput, { target: { value: 'Test Blog' } })
    fireEvent.change(authorInput, { target: { value: 'Juuso justiinsa' } })
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    fireEvent.submit(form)

    expect(mockAddBlogHandler).toHaveBeenCalledTimes(1)
    expect(mockAddBlogHandler).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'Juuso justiinsa',
      url: 'https://example.com',
    })
  })
})