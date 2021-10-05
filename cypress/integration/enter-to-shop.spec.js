describe('Enter to site', () => {
    it('First enter to web-page', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page')
            cy.visit(data.main_url)
            cy.get('title').should('have.text', 'Тестирование')

            cy.log('Search nav elements')            
            cy.get('.navbar-nav > :nth-child(1) > .nav-link').should('exist')
            cy.get('.navbar-nav > :nth-child(2) > .nav-link').should('exist')
            cy.get('.navbar-nav > :nth-child(3) > .nav-link').should('exist')
            cy.get('.navbar-nav > :nth-child(4) > .nav-link').should('exist')

            cy.log('Search cart icon')   
            cy.get('.fas').should('exist')
            
            cy.log('Form input')   
            cy.get('.form-inline > .form-control').should('exist')
            cy.get('.form-inline > .form-control').invoke('attr', 'placeholder').should('contain', 'Введите название') 

            cy.get('.form-inline > .btn').should('exist')
            cy.get('.form-inline > .btn').should('have.text', 'Найт') 

            cy.log('Search cart icon')  
            cy.screenshot('main-page');
        })
    })
});