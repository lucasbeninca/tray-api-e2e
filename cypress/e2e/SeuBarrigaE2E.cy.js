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

  //como preciso reutilizar o ultimo cadastro feito no cenário 1 para realizar o 2 e 3 salvo de forma externa a variavel.
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

// COMENTÁRIO IMPORTANTE:
// como boa pratica um teste não deveria depender do outro
// por isso não é bom depender do 1° teste de cadastro para testar senha inválida
// fiz dessa forma pois entendo que o desafio busca validar como trabalho com variaveis e valores
it('Cenário 2: Login senha invalida', () => {
  const email = Cypress.env('email')
  const senhaInvalida = 'senhainvalida' // Senha inválida para o teste de login poderia criar uma senha nova com o faker mas achei desenecessário

  cy.get('#email')
    .type(email)

  cy.get('#senha')
    .type(senhaInvalida)

  cy.get('button[type="submit"]')
    .click()

  // validando mensagem de erro
  cy.get('div.alert.alert-danger[role="alert"]')
  .should('be.visible')
  .and('contain.text', 'Problemas com o login do usuário')
})

// COMENTÁRIO IMPORTANTE:
// como boa pratica um teste não deveria depender do outro
// por isso não é bom depender do 1° teste de cadastro para testar login com sucesso
// fiz dessa forma pois entendo que o desafio busca validar como trabalho com variaveis e valores
it('Cenário 3: Login senha valida', () => {
    // Dados do primeiro teste para realizar login
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
// não vou usar um  teste para cadastrar um usuário e nem uma conta pois o objetivo do teste é 
// criar uma movimentação, logo já devo ter esse pré-requisito pronto
// por isso estou usando um comando personalizado para fazer login e chegar a página de fazer movimentação
// não sei por quanto tempo a aplicação  Seu barriga persiste os dados então poder ser que o cadastro usado nesse teste tenha sido apagado
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
//test
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
