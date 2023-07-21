import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
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
  const isCurrentUserBlogCreator = currentUser && (currentUser.username === blog.user.username || currentUser.id === blog.user.id)

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
        <button data-testid={`toggle-button-${blog.id}`} onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div><strong>URL: </strong>{blog.url}</div>
          <div>
            <strong>Likes:</strong> {blog.likes}{' '}
            <button id="likeButton" onClick={handleLikeClick}>Like</button>
          </div>
          <div><strong>username: </strong>{blog.user.name}</div>
          {isCurrentUserBlogCreator && (
            <button id="deleteButton" onClick={handleDeleteClick}>Delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog