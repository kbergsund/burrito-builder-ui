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

  it('should display header containing title & form on load', () => {
    cy.get('main').get('header').get('h1').contains('Burrito Builder')

    .get('form')
    .get('input').invoke('attr', 'placeholder').should('contain','Name')
    .get('[name=beans]')
    .get(':nth-child(1)').contains('beans')
    .get(':nth-child(13)').contains('sour cream')
    .get('p').contains('Order: Nothing selected')
    .get('button').contains('Submit Order')
  })

  it('should display all existing orders on load', () => {
    cy.get('section')
    .get(':nth-child(1)').get('h3').contains('Pat')
    .get('.ingredient-list > :nth-child(5)').contains('jalapeno')
    .get(':nth-child(2)').get('h3').contains('Sam')
    .get('.ingredient-list > :nth-child(6)').contains('jalapeno')
    .get(':nth-child(3)').get('h3').contains('Alex')
    .get('.ingredient-list > :nth-child(5)').contains('queso fresco')
  })
})