describe('Homepage tests', () => {
  beforeEach(() => {
    cy.fixture('./orders.json')
      .then(allOrders => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
          statusCode: 200,
          body: allOrders
        })
      })
    cy.visit('http://localhost:3000/')
  })

  it('should display header containing title & form on load', () => {
    cy.get('main').get('header').get('h1').contains('Burrito Builder')

    .get('form')
    .get('input').invoke('attr', 'placeholder').should('contain','Name')
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

  it('should update form values with user interaction', () => {
    cy.get('input').type('Kyra').should('have.value', 'Kyra')
    .get('[name=beans]').click()
    .get('[name=sofritas]').click()
    .get('p').contains('Order: beans, sofritas')
    .get('button').contains('Submit Order').click()
  })

  it('should add and display new order on successful form submission', () => {
    cy.get('input').type('Kyra')
    .get('[name=beans]').click()
    .get('[name=sofritas]').click()
    .get('button').contains('Submit Order').click()

    .get('section').get(':nth-child(4)').get('h3').contains('Kyra')
    .get('.ingredient-list > :nth-child(2)').contains('sofritas')
  })

  it('should not add or display new order if either name or ingredient form fields are blank', () => {
    cy.get('input').type('Kyra')
    .get('button').contains('Submit Order').click()
    .get('.order').should('have.length', '3')

    cy.get('[name=beans]').click()
    .get('button').contains('Submit Order').click()
    .get('.order').should('have.length', '3')
  })
})