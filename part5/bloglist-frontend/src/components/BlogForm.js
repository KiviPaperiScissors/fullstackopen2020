import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user
    })

    setNewUrl('')
    setNewTitle('')
    setNewAuthor('')
  }

  return (
    <div className="formDiv">

      <h2> Create new entry: </h2>
      <form onSubmit={addBlog}>
        <div>
          Title: <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author: <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url: <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">Add entry</button>
        </div>
      </form>

    </div>
  )

}

export default BlogForm
