import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notifications from './components/Notification'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}> Cancel</button>
        </div>
      </div>
    )
  }

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

  const logoutForm = () => (
    <LogoutForm
      user={user}
      handleLogout={handleLogout}
    />
  )

  const blogForm  = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} user={user}
      />
    </Togglable>
  )


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
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

  const updateBlog = (id, blogObject) => {
    console.log(blogObject)
    blogService
      .update(id, blogObject)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog._id !== id
          ? blog : updatedBlog))
        setNotificationMessage(
          `${blogObject.title} liked!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('error in update', error.response.data)
        setErrorMessage(error.response.data)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const removeBlog = (id) => {
    let delBlogTitle = blogs.find(p => p.id === id).title
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(p => p.id !== id))
      })
    setNotificationMessage(`${delBlogTitle} deleted from the collection.`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notifications.Notification message={notificationMessage} />
      <Notifications.Error message={errorMessage} />
      {
        user !== null && logoutForm()
      }
      {
        user === null ?
          loginForm() :
          blogForm()
      }

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          user={user}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App
