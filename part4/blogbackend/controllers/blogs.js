const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1})

  response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {

  const body = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)


    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    } else {
      const user = await User.findById(decodedToken.id)

      if (!body.likes) {
        body.likes = 0
      }
      if (!body.title && !body.url)  {
        return response.status(400).json({
        error: 'title and url missing'
      })
      } else {

        const blog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
          user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
      }
    }
  } catch (exception) { next(exception) }
})


blogsRouter.delete('/:id', async (request, response, next) => {

  const blog = await Blog.findById(request.params.id)
  console.log(blog)

  try {
    //console.log('checking token in the delete request')
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    } else {
      const user = await User.findById(decodedToken.id)
      //console.log('did we find the user?')
      //console.log(user)

      if ( blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)

        response.status(204).end()
      } else {
        return response.status(401).json({
          error: 'Unauthorized'
        })
      }
    }
  } catch (exception) { next(exception) }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  //console.log(body)
  const target = request.params.id

  //console.log(target)

  if (!body.title && !body.url)  {
    return response.status(400).json({
    error: 'title and url missing'
    })
  } else {

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)


      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid'})
      } else {
        const user = await User.findById(decodedToken.id)
        if ( body.user.toString() === user.id.toString()) {
          // console.log('did we make it into the if clause?')
          const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
          }
          console.log(blog)
          // we made it this far, and then it dies...

          await Blog.findByIdAndUpdate(target, blog, { new: true })
          response.status(200).json(blog)
        } else {
          return response.status(401).json({
            error: 'Unauthorized'
          })
        }
      }
    } catch(exception) { next(exception) }
  }
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'missing or invalid token'
    })
  }

  next(error)
}

module.exports = blogsRouter
