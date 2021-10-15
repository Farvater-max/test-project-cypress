describe('Purchase scenario without registration', () => {
    it('Selection of subjects item', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page')
            cy.visit(data.main_url)
            cy.get('.btn.btn-primary').scrollIntoView().should('be.visible')
            
            cy.log('Type select')
            cy.get(':nth-child(35) > .form-control').type(401) 
            cy.get(':nth-child(36) > .form-control').type(667)
            cy.log('Submit form and check correct url')
            cy.get('.btn.btn-primary').click()
            cy.url().should('eq', 'http://shop.bugred.ru/?price_from=401&price_to=667')
        })
    })

    it('Get subjects item in basket', () => {
        cy.log('Find item and add to basket')
        cy.visit('http://shop.bugred.ru/?price_from=401&price_to=667')
        cy.get(':nth-child(1) > a > .img').click()
        cy.get('#exampleCount').type('1')
        cy.get('.btn.btn-primary').should('have.text', 'Добавить в корзину').click()
        cy.get('.float-right > .nav-link').should('have.text', ' 1')
        cy.go('back')
        cy.go('back')
        cy.get(':nth-child(2) > a > .img').click()
        cy.get('#exampleCount').type('1')
        cy.get('.btn.btn-primary').should('have.text', 'Добавить в корзину').click()

        cy.log('Enter to basket and look to order')
        cy.get('.float-right > .nav-link').should('have.text', ' 2').click()    
        
        cy.log('Check order sum')
        cy.get('tbody > :nth-child(1) > :nth-child(4)').then(($td) => {
            const firstItem = parseFloat($td.text())

            cy.get('tbody > :nth-child(2) > :nth-child(4)').then(($td) => {
                const secondItem = parseFloat($td.text())

                cy.get(':nth-child(3) > :nth-child(4)').then(($td) => {
                    const finalSum = parseFloat($td.text())
                
                expect(finalSum).to.eq(firstItem + secondItem)
                })
            })
        })

        cy.log('Submit order form and correct URL, message')
        cy.get('#InputPhone').type('333-00-99')
        cy.get('#InputAddr').type('Санкт-Петербург, ул. Ленина, д.78, кв.98')
        cy.get('.btn.btn-primary').click()

        cy.get('h4').then(($h4) => {
            const orderNum = parseInt($h4.text().replace(/[^0-9]/g,''))
            const urlAdress = 'http://shop.bugred.ru/shop/cart/finish/' + orderNum;
            const textOrder = 'Ваш заказ №' + orderNum + ' собран и отправлен. Ура!';

            cy.url().should('eq', urlAdress)
            cy.get('h4').contains(textOrder)
        })        
    })
         
});