import { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import Togglable from './components/Toggle.js'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/BlogForm.js'
import Footer from './components/Footer.js'

import blogService from './services/blogs.js'
import loginService from './services/login.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({
    message: '',
    className: '',
  })

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const initialBlogs = await blogService.getAll()
        const sortedBlogs = initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      } catch (error) {
        console.log('Error fetching blogs:', error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (notification.message !== '') {
      const timeout = setTimeout(() => {
        setNotification({
          message: '',
          className: '',
        })
      }, 3000)

      return () => clearTimeout(timeout) // Clear the timeout when the component unmounts or when notification changes
    }
  }, [notification])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser({
        id: user.id,
        username: user.username,
        name: user.name,
      })
      setUsername('')
      setPassword('')
      setNotification({
        message: `Logged in as ${user.name}`,
        className: 'good',
      })
    } catch (error) {
      console.log('Login failed. Error:', error)
      setNotification({
        message: 'Wrong username or password',
        className: 'error',
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotification({
      message: 'Logged out',
      className: 'good',
    })
  }

  const handleLike = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId)
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    try {
      const updated = await blogService.updateBlog(blogId, updatedBlog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((prevBlog) => (prevBlog.id === updated.id ? updated : prevBlog))
      )
    } catch (error) {
      console.log('Error updating blog:', error)
      setNotification({
        message: 'Error updating blog',
        className: 'error',
      })
    }
  }

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (error) {
      console.log('Error deleting blog:', error)
      setNotification({
        message: 'Error deleting blog',
        className: 'error',
      })
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      }

      const addedBlog = await blogService.addBlog(blog)
      console.log('ADDING BLOG')
      console.log('addedBlog:', addedBlog)
      setBlogs(blogs.concat(addedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotification({
        message: `Added ${blog.title} by ${blog.author}`,
        className: 'good',
      })
    } catch (error) {
      setNotification({
        message: 'Error adding blog',
        className: 'error',
      })
      console.log('AddBlog error:', error)
    }
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification message={notification.message} className={notification.className} />

      {!user && (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog">
            <BlogForm
              addBlog={addBlog}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
              setNewTitle={setNewTitle}
              setNewAuthor={setNewAuthor}
              setNewUrl={setNewUrl}
            />
          </Togglable>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          currentUser={user}
        />
      ))}

      <Footer />
    </div>
  )
}

export default App
