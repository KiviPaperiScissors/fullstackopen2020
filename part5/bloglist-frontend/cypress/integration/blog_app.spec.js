describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Tester McTestson',
      username: 'tester',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)



    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })
})

describe('Login', function () {
  it('Succeeds with correct credentials', function () {
    cy.contains('Log in').click()
    cy.get('input.username')
      .type('tester')
    cy.get('input.password')
      .type('test')
    cy.get('#login-button').click()
    cy.contains('Tester McTestson is logged in')

  })

  it('Fails with incorrect credentials', function () {
    cy.contains('Log out').click()
    cy.get('input.username')
      .type('theDonald')
    cy.get('input.password')
      .type('12345')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'tester', password: 'test'
    }).then(response => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('A new blog can be created', function() {
    cy.contains('New blog').click()
    cy.get('#title')
      .type('A new blog')
    cy.get('#author')
      .type('A new author')
    cy.get('#url')
      .type('www.newurl.fi')
    cy.contains('Add entry').click()
    cy.contains('"A new blog" added to collection')
    cy.contains('Title: A new blog')
  })

  it('A blog can be liked', function() {
    cy.contains('Show details').click()
    cy.contains('Likes: 0')
    cy.get('#like').click()
    cy.contains('Likes: 1')

  })

  it('The created blog can be deleted', function() {
    cy.contains('Show details').click()
    cy.contains('Delete').click()
    cy.contains('deleted from the collection')
  })
})

describe('Multiple blogs', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'tester', password: 'test'
    }).then(response => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    cy.createBlog({
      title: 'Ugga',
      author: 'Bugga',
      url: 'www.fi',
      likes: 3465
    })
    cy.createBlog({
      title: 'Ugga II, the return',
      author: 'Bugga',
      url: 'www.fi',
      likes: 325
    })
    cy.createBlog({
      title: 'Ugga III, the bad years',
      author: 'Bugga',
      url: 'www.fi',
      likes: 34
    })
    cy.createBlog({
      title: 'Ugga IV, anime version',
      author: 'Bugga',
      url: 'www.fi',
      likes: 3465456
    })
  })

  it('The blogs with the most likes are displayed first', function () {
    let likesArray = []

    cy.get('.blog')
      .each(($el) => {
        cy.wrap($el).contains('Show details').click()
      })
    cy.get('.blogLikes')
      .each(($el) => {
        let thing = $el.text()
        let newThing = thing.replace('Likes: ', '')
        // newThing = newThing.replace(' Like', '')
        let number = parseInt(newThing)
        likesArray = likesArray.concat(number)
        console.log(likesArray)
      })
      .then(() => {
        //console.log('did we make it in here?')
        let isSorted = false
        for (var i = 1; i < likesArray.length; i++) {
          //console.log(likesArray[i])
          if (likesArray[i] < likesArray[i-1]) {
            isSorted = true
          } else {
            isSorted = false
            break
          }
        }
        cy.expect(isSorted).to.be.true
      })
  })
})
