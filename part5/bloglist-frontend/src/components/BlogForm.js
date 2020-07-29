import React, {useState} from 'react'

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
    <>

         <h2> Create new entry: </h2>
         <form onSubmit={addBlog}>
           <div>
             Title: <input
               value={newTitle}
               onChange={handleTitleChange}
             />
           </div>
           <div>
             Author: <input
               value={newAuthor}
               onChange={handleAuthorChange}
             />
           </div>
           <div>
             Url: <input
               value={newUrl}
               onChange={handleUrlChange}
             />
           </div>
           <div>
             <button type="submit">Add entry</button>
           </div>
         </form>

       </>
   )

}

export default BlogForm