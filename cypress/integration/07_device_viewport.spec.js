describe('Change viewport size', () => {
    it('Should correct image on change size(mob)', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page devise')
            cy.viewport(375, 667)
            cy.visit(data.main_url)
            cy.get('title').should('have.text', 'Тестирование')
            cy.contains('.navbar-nav > :nth-child(1) > .nav-link').should('not.exist')
            cy.contains('.form-inline > .btn').should('not.exist')  
            cy.get('.navbar-toggler-icon')
                .should('exist') 
                .click() 

            cy.get('.navbar-nav > :nth-child(1) > .nav-link').should('exist')
            cy.get('.form-inline > .btn').should('exist')   
        })
    })
    it('Should correct image on change size(tablet)', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page tablet')
            cy.viewport(768, 1024)
            cy.visit(data.main_url)
            cy.get('title').should('have.text', 'Тестирование')
            cy.contains('.navbar-nav > :nth-child(1) > .nav-link').should('not.exist')
            cy.contains('.form-inline > .btn').should('not.exist')  
            cy.get('.navbar-toggler-icon')
                .should('exist') 
                .click() 

            cy.get('.navbar-nav > :nth-child(1) > .nav-link').should('exist')
            cy.get('.form-inline > .btn').should('exist')   
        })
    })
});

