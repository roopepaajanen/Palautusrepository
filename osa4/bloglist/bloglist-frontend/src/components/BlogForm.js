import React from 'react'

const BlogForm = ({ addBlog, newTitle, newAuthor, newUrl, setNewTitle, setNewAuthor, setNewUrl }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog(event)
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form data-testid="blog-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="blogTitle"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button id="submit" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
