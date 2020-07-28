import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [ showDetails, setShowDetails] = useState(false)
  const label = showDetails ? 'Hide details' : 'Show details'

  const toggleVisibility = (event) => {
    if (showDetails) {setShowDetails(false)} else {
      setShowDetails(true)
    }
  }

  const verboseMode = () => (
    <>
    <div>URL: {blog.url} </div>
    <div>Likes: {blog.likes} </div>
    <div>User: {JSON.stringify(blog.user.name)} </div>
    </>
  )

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
