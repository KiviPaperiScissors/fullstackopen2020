import React from 'react'

const LogoutForm = ({
  user,
  handleLogout
}) => {
  return (
    <div>
      {user.name} is logged in.
      <button onClick={handleLogout}>
        Log out
        </button>
      </div>
  )
}

export default LogoutForm
