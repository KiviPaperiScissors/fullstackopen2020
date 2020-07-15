const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  } else if (!blog.title && !blog.url)  {
    return response.status(400).json({
      error: 'title and url missing'
    })
  } else {
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  // console.log(body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  console.log(blog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)

})

module.exports = blogsRouter
