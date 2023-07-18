import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
  }

  return (
    <div>
      <h1>Log into application</h1>
      <form>
        Username:
        <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
        Password:
        <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
