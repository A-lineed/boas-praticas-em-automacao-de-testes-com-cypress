import { faker } from '@faker-js/faker'

describe('Flaky tests bad practice', () => {
  beforeEach(() => {

    cy.intercept(
      'GET',
      '**/search**',
      { fixture: 'stories' }
    )

    cy.visit('https://wlsf82-hacker-stories.web.app')

  })

  Cypress._.times(10, () => {
    it('shows a max of 5 buttons for the last searched terms', () => {
      Cypress._.times(6, () => {
        cy.search(faker.random.word())
      })

      cy.get('.last-searches button')
        .should('have.length', 5)
    })
  })
})
