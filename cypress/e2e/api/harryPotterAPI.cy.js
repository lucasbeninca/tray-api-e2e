describe('Testes da API Potter', () => {
it('Cenario 1: Deve retornar um JSON válido para a API /houses', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/houses')
    .its('body')
    .should('be.an', 'array') 
    .each((item) => {
        expect(item).to.have.property('house');
        expect(item).to.have.property('emoji');
        expect(item).to.have.property('founder');
        expect(item).to.have.property('colors');
        expect(item).to.have.property('animal');
        expect(item).to.have.property('index');
});

});
  
it('Cenario 2: Deve retornar erro para URL inválida', () => {
    cy.request({
    url: 'https://potterapi-fedeperin.vercel.app/jp',
    failOnStatusCode: false 
    }).its('status').should('be.eq', 404);  

    cy.request({
    url: 'https://potterapi-fedeperin.vercel.app/jp',
    failOnStatusCode: false
    }).its('body')
    .should('have.property', 'error')  
    
});


it('Cenario 3: Deve retornar a listagem de feitiços com estrutura correta', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/spells')
    .its('body')
    .should('be.an', 'array')
    .each((item) => {
        expect(item).to.have.property('spell');
        expect(item).to.have.property('use');
        expect(item).to.have.property('index');
        
    })
});

it('Cenario 4: Deve retornar o feitiço "Accio" com as propriedades corretas', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/spells')
        .its('body')
        .should('be.an', 'array') 
        .then(spells => {
        const accioSpell = spells.find(spell => spell.spell === 'Accio');
        expect(accioSpell).to.exist;  
        expect(accioSpell).to.have.property('spell', 'Accio');  
        expect(accioSpell).to.have.property('use'); 
        });
    });
    
it('Cenario 5: valida endpoint em englês retornar "English" como idioma', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/en')
    .its('body')
    .should('have.property', 'message', 'This is the endpoint of the English language')

})

it(' Cenario 6: valida 4 rotas da API /pt com sucesso', () => {
    const routes = [
    '/books',
    '/characters',
    '/houses',
    '/spells'
    ];

    routes.forEach(route => {
    cy.request('GET', `https://potterapi-fedeperin.vercel.app/pt${route}`)
        .its('status')
        .should('equal', 200); 
    });
});

it('Cenario 7: Deve validar que a casa Grifinória existe e possui as propriedades corretas', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/houses')
        .its('body')  
        .should('be.an', 'array')
        .then((houses) => {
        const grifinoria = houses.find(item => item.house === 'Grifinória');
        expect(grifinoria).to.not.be.undefined; 
        expect(grifinoria).to.have.property('house', 'Grifinória');
        
        });
    });
    

it('Cenario 8: Deve validar o personagem Harry Potter e seu ator', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/characters')
    .its('body')
    .should('be.an','array')
    .then((characters) => {
        const harry = characters.find(item => item.fullName === 'Harry James Potter');
        expect(harry).to.have.property('fullName', 'Harry James Potter');
        expect(harry).to.have.property('interpretedBy','Daniel Radcliffe')
});
});
  
it('Cenario 9: Deve validar o JSON do personagem com índice válido', () => {
    cy.request('GET', 'https://potterapi-fedeperin.vercel.app/pt/characters')
      .its('body')
      .should('be.an', 'array') 
      .then((indice) => {
          const personagem = indice.find(item => item.index === 0); 
          expect(personagem).to.have.property('index', 0); 
       
      });
});

})
  