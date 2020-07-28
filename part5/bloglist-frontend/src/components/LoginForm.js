import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
return (
  <form onSubmit={handleSubmit}>
    <div>
      Username:
      <input
        type = "text"
        value={username}
        name="username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">Log in</button>
  </form>
)}

export default LoginForm
