import { faker } from '@faker-js/faker'
import dayjs from 'dayjs';

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://seubarriga.wcaquino.me/login')
    cy.title().should('be.equal', 'Seu Barriga - Log in')
  })
  
it('Cenário 1: Cadastrar novo usuario com sucesso', () => {
  // Escolhi utilizar o faker para gerar dados randomicos para cadastrar
  const nome = faker.person.firstName()
  const email = faker.internet.email()
  const senha = faker.internet.password()

  Cypress.env('nome', nome)
  Cypress.env('email', email)
  Cypress.env('senha', senha)

  cy.contains('a', 'Novo usuário')
    .should('be.visible')
    .click()

  cy.title()
  .should('be.equal', 'Seu Barriga - Novo Usuário')

  cy.get('#nome')
    .type(nome)
    .should('have.value', nome)

  cy.get('#email')
    .type(email)
    .should('have.value', email)

  cy.get('#senha')
    .type(senha)
    .should('not.be.null')

  cy.get('input[type="submit"][value="Cadastrar"]')
    .should('be.visible')
    .click()

  cy.get('div.alert.alert-success[role="alert"]')
    .should('be.visible')
    .and('contain.text', 'Usuário inserido com sucesso')
})

it('Cenário 2: Login senha invalida', () => {
  const email = Cypress.env('email')
  const senhaInvalida = 'senhainvalida' 

  cy.get('#email')
    .type(email)

  cy.get('#senha')
    .type(senhaInvalida)

  cy.get('button[type="submit"]')
    .click()

  cy.get('div.alert.alert-danger[role="alert"]')
  .should('be.visible')
  .and('contain.text', 'Problemas com o login do usuário')
})

it('Cenário 3: Login senha valida', () => {
    const nome = Cypress.env('nome')
    const email = Cypress.env('email')
    const senha = Cypress.env('senha') 
    
    cy.get('#email')
      .type(email)

    cy.get('#senha')
      .type(senha)

    cy.get('button[type="submit"]')
      .click()

    cy.get('.alert.alert-success')
    .should('be.visible')
    .and('contain.text', `Bem vindo, ${nome}!`)
  })


it('Cenario 4: Criando movimentacao', ()=>{

  const today = dayjs().format('DD/MM/YYYY')
  cy.loginEAbreTelaCriarMovimentacao()

  cy.get('#data_transacao')
  .type(today)

  cy.get('#data_pagamento')
  .type(today)

  cy.get('#descricao')
  .type('teste tray')

  cy.get('#interessado')
  .type('tray')

  cy.get('#valor')
  .type('1000')

  cy.get('#conta')
  .select('lucasTesteTray')

  cy.get('#status_pago')
  .check()

  cy.contains('a','Resumo Mensal')
  .should('be.visible')
  .click()

  cy.title()
  .should('be.equal', 'Seu Barriga - Extrato')


  cy.get('#tabelaExtrato').within(() => {
    cy.get('tbody tr').eq(0).within(() => {
    
      cy.get('td').eq(0)
      .should('have.text', 'teste tray'); 

      cy.get('td').eq(1)
      .should('have.text', '27/11/2024'); 
      
      cy.get('td').eq(2)
      .should('have.text', 'lucasTesteTray'); 

      cy.get('td').eq(3)
      .should('have.text', '1000.00'); 

      cy.get('td').eq(4)
      .should('contain.text', 'Pago'); 

    
    });
  });
})


})
