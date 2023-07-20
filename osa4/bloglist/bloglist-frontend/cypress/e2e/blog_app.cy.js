describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    //cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    /*const user = {
      username: 'roopepaajanen',
      name: 'roopepaajanen',
      password: 'roopepaajanen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)*/
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.wait(1000)
      cy.contains('log in').click()
      cy.get('#username').type('ropsu')
      cy.get('#password').type('ropsu')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.wait(1000)
      cy.contains('log in').click()
      cy.get('#username').type('wrong_username')
      cy.get('#password').type('wrong_password')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.wait(1000)
      cy.contains('log in').click()
      cy.get('#username').type('ropsu')
      cy.get('#password').type('ropsu')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.wait(1000)
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('Test Blog Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://example.com')
      cy.get('#submit').click()

      // Assert the blog is created and displayed on the page
      cy.contains('Test Blog Title').should('be.visible')
    })
    it('A blog can be liked', function() {
      cy.wait(1000)
      cy.contains('View').click()
      cy.contains('Likes: 0').should('be.visible')
      cy.get('#likeButton').click()
      cy.contains('Likes: 1').should('be.visible')
      cy.get('#likeButton').click()
      cy.contains('Likes: 2').should('be.visible')
    })
    it('A blog can be deleted', function() {
      cy.wait(1000)
      cy.contains('View').click()
      cy.contains('Delete').click()
      cy.contains('Test Blog Title').should('not.exist')
    })
    it('Only Blog creator can delete a blog', function() {
      cy.wait(1000)
      //create a new blog
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('Test Blog Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://example.com')
      cy.get('#submit').click()

      //log out and log in as another user
      cy.contains('Logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('roope')
      cy.get('#password').type('roope')
      cy.get('#login-button').click()

      //try to delete the blog
      cy.contains('View').click()
      cy.contains('Delete').should('not.exist')
    })
  })
})