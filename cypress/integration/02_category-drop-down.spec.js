describe('Category navbar dropdow by click', () => {
    it('Should dropdow menu by click and exist elements', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page')
            cy.visit(data.main_url)
            cy.get('title').should('have.text', 'Тестирование')

            cy.log('Search nav elements')            
            cy.get('#navbarDropdown').click() 
            
            cy.get('.dropdown-menu a')
                .should('have.length', 12)
                .first()
                .should('have.text', 'Категория 1')
            
            cy.get('.dropdown-menu > :nth-child(5)').click()
            cy.get('.breadcrumb-item.active').should('have.text', 'Платья')
                       
            cy.get('#navbarDropdown').click() 
            cy.get('.dropdown-menu > :nth-child(12)').click()
            cy.get('.breadcrumb-item.active').should('have.text', 'Футболки')    

            cy.get('#navbarDropdown').click() 
            cy.get('.dropdown-menu > :nth-child(6)').click()
            cy.get('.breadcrumb-item.active').should('have.text', 'Шорты')

            cy.get('#navbarDropdown').click() 
            cy.get('.dropdown-menu > :nth-child(1)').click()
            cy.get('.breadcrumb-item.active').should('have.text', 'Категория 1')

            cy.get('.breadcrumb > :nth-child(1) > a').click()
            cy.contains('.breadcrumb > :nth-child(1) > a').should('not.exist')
        })
    })
});