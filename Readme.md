# Descrição
Projeto para atender o que foi proposto pela Tray

- **Avisos importantes:** Sobre os testes E2E, uma boa prática de testes automatizados é evitar que os testes sejam co-dependentes. No entanto, conforme solicitado no documento, os testes 1, 2 e 3 dependem uns dos outros. Entendo que essa abordagem foi escolhida para avaliar o uso das features do Cypress e do JavaScript, mas fica aqui a minha consideração.
    - Não comentei o código explicando o que cada bloco faz pois segundo Robert C. Martin em seu livro Clean Code, comentários no código são uma má prática pois criam uma camada de abstração que precisará receber manutenção, e nas palavras de Robert C. M. 'comentários são resultados de um código mal escrito.'

- **Cenário 4:** Criei um cadastro utilizando um e-mail de teste e a senha 123@123. Em um cenário normal, eu colocaria essa senha em um arquivo Cypress.env que não seria versionado no GitHub, garantindo assim a segurança. No entanto, como este projeto é apenas para testes e o cadastro será apagado em breve, vou enviar a senha junto ao comando personalizado **loginEAbreTelaCriarMovimentacao**.

- **CONSIDERAÇÃO FINAL** Não sei por quanto tempo o site do SeuBarriga persiste os dados, pode ser que o cadastro utilizado no Cenário 4, não exista mais quando este projeto for avaliadom que faria com que o mesmo tivesse a necessidade de ser recadastrado, coisa que em um ambiente de produção real não aconteceria.


## Pre-requisitos
- node.js v20.0.0 + 
- npm v10.0.0 + 
    - Documentação Oficial: https://nodejs.org/pt 
- cypress 13.0.0 + 
    - Documentação Oficial: https://www.cypress.io/
- Faker - install: npm install @faker-js/faker --save-dev
    - Documentação Oficial: https://www.npmjs.com/package/@faker-js/faker


## Instalação

- Run `npm install` para instalar as dev dependeces

## Estrutura dos testes 
 - Mantida a pasta padrão do Cypress e2e e dentro dela criado uma pasta api para testes de API e GUI para Testes de interface grafica E2E
## Tests
- **Para abrir o cypress e executar os testes em modo grafico**
  - npx cypress open
- **Modo headlers**
  - npx cypress run


