describe('My First Test', () => {
    it('Visits the app', () => {
      cy.visit('http://localhost:3000')
      cy.get('nav').contains('Study Space Finder');
    })
  })
  