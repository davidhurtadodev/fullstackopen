describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testUser',
      name: 'test user',
      password: 'pass123',
    });

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('login', function () {
    it('fails with wrong credentials', function () {
      cy.get('#userInput').type('wrongUser');
      cy.get('#passwordInput').type('wrongPassword');
      cy.contains('login').click();

      cy.contains('wrong username or password');
    });

    it('success with right credentials', function () {
      cy.get('#userInput').type('testUser');
      cy.get('#passwordInput').type('pass123');
      cy.contains('login').click();

      cy.contains('testUser logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#userInput').type('testUser');
      cy.get('#passwordInput').type('pass123');
      cy.contains('login').click();
    });

    it('user can create a blog post', function () {
      cy.contains('new blog').click();

      cy.get('.title-input').type('Testing cypress');
      cy.get('.author-input').type('Fabulous author');
      cy.get('.url-input').type('www.idontknow.com');

      cy.get('#createBlogButton').click();

      cy.contains('a new blog Testing cypress by Fabulous author created');
      cy.contains('Testing cypress Fabulous author');
    });

    describe('when blog its created', function () {
      beforeEach(function () {
        cy.contains('new blog').click();
        cy.get('.title-input').type('Testing cypress');
        cy.get('.author-input').type('Fabulous author');
        cy.get('.url-input').type('www.idontknow.com');

        cy.get('#createBlogButton').click();
      });

      it('user can like a blog', function () {
        cy.contains('View').click();

        cy.get('#likeValue').should('to.have.text', '0');

        cy.contains('like').click();

        cy.get('#likeValue').should('to.have.text', '1');
      });

      it('user can delete blog', function () {
        cy.contains('View').click();
        cy.contains('Delete').click();

        cy.get('Testing cypress').should('not.exist');
      });

      it.only('blogs are ordered with likes', function () {
        cy.contains('new blog').click();
        cy.get('.title-input').type('Testing likes');
        cy.get('.author-input').type('hola');
        cy.get('.url-input').type('www.testingorder.com');

        cy.get('#createBlogButton').click();

        cy.get('.blog').eq(0).should('contain', 'Testing cypress');
        cy.wait(1000);
        cy.get('.blog').eq(1).should('contain', 'Testing likes');
        cy.get('.view-button').eq(1).click();

        cy.get('button').contains('like').click();
        cy.wait(1000);

        cy.get('.blog').eq(0).should('contain', 'Testing likes');
        cy.wait(1000);
        cy.get('.blog').eq(1).should('contain', 'Testing cypress');
      });
    });
  });
});
