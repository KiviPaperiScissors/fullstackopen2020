import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setNotificationMessage(`${user.name} logged in`)
      setUsername('')
      setPassword('')
      console.log('logging in as ', user)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('Wrong credentials')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

    }

  }

  const handleLogout = (event) => {
    event.preventDefault()

    setNotificationMessage(`${user.name} logged out.`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type = "text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  )

  const blogForm  = () => (
    <>
      <div>
        {user.name} is logged in.
        <button onClick={handleLogout}>
          Log out
          </button>
        </div>
        <h2> Create new entry: </h2>
        <form onSubmit={addName}>
          <div>
            Title: <input
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            Author: <input
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            Url: <input
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <div>
            <button type="submit">Add entry</button>
          </div>
        </form>

      </>
  )

  const addName = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }


    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNotificationMessage(`"${returnedBlog.title}" added to collection.`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
        .catch(error => {
          console.log('something went wrong with posting', blogObject, error.response.data)
          setErrorMessage('Something went wrong with posting')
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  return (
    <div>
      <h2>blogs</h2>

      <Notifications.Notification message={notificationMessage} />
      <Notifications.Error message={errorMessage} />

      {
        user === null ?
          loginForm() :
          blogForm()
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
