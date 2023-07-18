import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLikeClick =  () => {
    handleLike(blog.id)
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>
          <strong>Title:</strong> {blog.title}
        </p>
        <p>
          <strong>Author:</strong> {blog.author}
        </p>
        <button onClick={toggleDetails}>{showDetails ? 'Hide' : 'View'}</button>
      </div>
      {showDetails && (
        <div>
          <div><strong>URL: </strong>{blog.url}</div>
          <div>
            <strong>Likes:</strong> {blog.likes}{' '}
            <button onClick={handleLikeClick}>Like</button>
          </div>
          <div><strong>username: </strong>{blog.user.name}</div>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog