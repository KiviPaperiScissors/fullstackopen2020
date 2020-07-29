import React, {useState} from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ showDetails, setShowDetails ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)
  const label = showDetails ? 'Hide details' : 'Show details'

  const toggleVisibility = (event) => {
    if (showDetails) {setShowDetails(false)} else {
      setShowDetails(true)
    }
  }
  const delButtonVisible = () => (
    <div><button onClick={deleteBlog}>Delete</button></div>

  )
  const verboseMode = () => (
    <>
    <div>URL: {blog.url} </div>
    <div>Likes: {likes} <button onClick={likeBlog}>Like</button></div>
    <div>User: {JSON.stringify(blog.user.name)} </div>
    {
      user.username === blog.user.username && delButtonVisible()
    }
    </>
  )

  const likeBlog = (event) => {
    event.preventDefault()
    console.log(blog.id, blog.user.id)
    updateBlog(
      blog.id,
      {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    )
    setLikes(likes + 1)

  }

  const deleteBlog = (event) => {
    event.preventDefault()
    let areYouSure = window
      .confirm(`Are you sure you want to delete ${blog.title}?`)
    if (areYouSure) {
      removeBlog(blog.id)
    } else {
      console.log('He chickened out, sir!')
    }
  }

  return (
    <div style={blogStyle}>
      <div>Title: {blog.title} </div>
      <div>Author: {blog.author} </div>
      {
        showDetails === true && verboseMode()
      }
      <button onClick={toggleVisibility}>{label}</button>
    </div>
  )
}

export default Blog
