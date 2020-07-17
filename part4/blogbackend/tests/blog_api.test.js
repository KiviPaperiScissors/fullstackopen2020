const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const TESTTOKEN = process.env.TESTTOKEN
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  let testUser = new User(helper.testUser)

  await testUser.save()

  await Blog.deleteMany({})

  let blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  const userLogin = {
    username: testUser.username,
    password: 'test'
  }

  const loggedUser = await api
    .post('/api/login')
    .send(userLogin)

  const testToken = loggedUser.body.token


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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog identifier is named \'id\'.', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'The blog',
    author: 'The Authossuy',
    url: 'somethingawful.com',
    likes: 3
  }

  await api
    .post('/api/blogs').set('Authorization', `bearer ${TESTTOKEN}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = await blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'The blog'
  )
})

test('a blog posted without like data defaults to zero likes', async () => {
  const newBlog = {
    title: 'nobody likes you',
    author: 'jaaas',
    url: 'thenewplace.com'
  }

  await api
    .post('/api/blogs').set('Authorization', `bearer ${TESTTOKEN}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0)

})

test('a blog posted without title and url is rejected, error code(400)', async () => {
  const newBlog = {
    author: 'jaaas',
    likes: 123453
  }

  await api
    .post('/api/blogs').set('Authorization', `bearer ${TESTTOKEN}`)
    .send(newBlog)
    .expect(400)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `bearer ${TESTTOKEN}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds if the blog entry is correctly updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    // console.log(blogToUpdate)

    blogToUpdate.likes = 1000
    // console.log(blogToUpdate)


    await api
      .put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${TESTTOKEN}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    // console.log(blogsAtEnd)

    expect(blogsAtEnd[0].likes).toBe(1000)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
