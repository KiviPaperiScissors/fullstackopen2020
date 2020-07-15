const bcrypt = require('bcrypt')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lavili',
      name: 'Lasse Ville',
      password: 'yomama'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('users are returned in the correct format', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a user posted without username is rejected, error code(400)', async () => {
    const newUser = {
      name: 'jaaas',
      password: 'yomama'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })

  test('a user posted without a password is rejected, error code(400)', async () => {
    const newUser = {
      username: 'jaaas',
      name: 'yomama'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password required')
  })

  test('a user posted with username shorter than 3 characters is rejected, error code(400)', async () => {
    const newUser = {
      username: 'la',
      name: 'jaaas',
      password: 'yomama'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

  })

  test('a user posted with password shorter than 3 characters is rejected, error code(400)', async () => {
    const newUser = {
      username: 'lavili',
      name: 'jaaas',
      password: 'yo'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password is too short')
  })
})




afterAll(() => {
  mongoose.connection.close()
})
