describe('Homepage tests', () => {
  beforeEach(() => {
    cy.fixture('./orders.json')
      .then(allOrders => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: allOrders
        })
        cy.visit('http://localhost:3000/')
      })
  })

  it('should display title, form & any existing orders', () => {
    // cy.visit('http://localhost:3000/')
    cy.get('h1').contains('Burrito Builder')
  })
})