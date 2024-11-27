Cypress.Commands.add('loginEAbreTelaCriarMovimentacao', () => {
    // Realiza o login
    cy.get('#email')
      .type('lebbeninca@gmail.com')
    cy.get('#senha')
      .type('123@123')
    cy.get('button[type="submit"]')
      .click()
  
    // Verifica a mensagem de boas-vindas
    cy.get('.alert.alert-success')
      .should('be.visible')
      .and('contain.text', 'Bem vindo, lucas!')

    // Clica na opção "Criar Movimentação"
    cy.contains('a', 'Criar Movimentação')
      .should('be.visible')
      .click()
  
    // Verifica se o label "Tipo da Movimentação" está visível
    cy.get('label[for="tipo"]')
      .should('be.visible')
      .and('contain.text', 'Tipo da Movimentação')
  })
  