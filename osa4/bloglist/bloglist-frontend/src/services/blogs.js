import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log('token set to:', token)
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log('Error fetching blogs:', error)
    throw error
  }
}

const addBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    console.log('adding blog:', blog)
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  } catch (error) {
    console.log('Error adding blog:', error)
    throw error
  }
}

const updateBlog = (id, newObject) => {
  try {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    return request.then(response => response.data)
  } catch (error) {
    console.log('Error updating blog:', error)
    throw error
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.log('Error deleting blog:', error)
    throw error
  }
}


const blogService = {
  setToken,
  getAll,
  addBlog,
  updateBlog,
  deleteBlog,
}

export default blogService
