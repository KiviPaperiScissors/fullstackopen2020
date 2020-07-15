const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({
      error: 'password required'
    })
  } else if (body.password.length < 3) {
    return response.status(400).json({
      error: 'password is too short'
    })
  } else {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    try {
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })

      const savedUser = await user.save()

      response.json(savedUser)
    } catch(exception) {
      next(exception)
    }
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.messagee })
  }

  next(error)
}

usersRouter.use(errorHandler)

module.exports = usersRouter
