describe('Scenario registration and purchase', () => {
     it('Registration and buy some item, check sum and order', () => {
        cy.fixture('example.json').then(data => {
            cy.visit(data.login_url)
            cy.log('Enter valid data') 
            cy.get('#exampleInputEmail1').type(data.login)
            cy.get('#exampleInputPassword1').type(data.password)
            cy.get(':nth-child(1) > form > .btn').should('have.text', 'Войти').click()

            cy.get('.btn.btn-primary').scrollIntoView().should('be.visible')
            
            cy.log('Filter item to buy')
            cy.get(':nth-child(35) > .form-control').type(522) 
            cy.get(':nth-child(36) > .form-control').type(899)
            cy.log('Submit form and check correct url')
            cy.get('.btn.btn-primary').click()
            cy.url().should('eq', 'http://shop.bugred.ru/?price_from=522&price_to=899')

            cy.log('Find item and add to basket')
            cy.get(':nth-child(10) > a > .img').click()
            cy.get('#exampleCount').type('1')
            cy.get('.btn.btn-primary').should('have.text', 'Добавить в корзину').click()
            cy.get('.float-right > .nav-link').should('have.text', ' 1')

            cy.go('back')
            cy.go('back')

            cy.get(':nth-child(11) > a > .img').click()
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

            cy.log('Delete item in order')
            cy.get('tbody > :nth-child(2) > :nth-child(5)').click()
            cy.log('Check sum after delete item')
            cy.get('tbody > :nth-child(1) > :nth-child(3)').then(($td) => {
                const firstItem = parseFloat($td.text())
                cy.get('tbody > :nth-child(2) > :nth-child(4)').then(($td) => {
                    const finalSum = parseFloat($td.text())
                    
                expect(finalSum).to.eq(firstItem)
                })
            })
            cy.log('Fill out the form')
            cy.get('.col-md-6 > .form-group > #InputSelect').select('7')
            cy.get('.col-md-5 > .form-group > #InputSelect').select('7')
            cy.get('#InputPhone').type('345-43-45')
            cy.get('#InputAddr').type('Москва, Зенитная улица, д.20')

            cy.log('Submit form and check info')
            cy.get('.btn.btn-primary').click()
            cy.get('h4').then(($h4) => {
                const orderNum = parseInt($h4.text().replace(/[^0-9]/g,''))
                const urlAdress = 'http://shop.bugred.ru/shop/cart/finish/' + orderNum;
                const textOrder = 'Ваш заказ №' + orderNum + ' собран и отправлен. Ура!';

                cy.url().should('eq', urlAdress)
                cy.get('h4').contains(textOrder)
            }) 
            
            cy.log('Check order in personal cabinet')
            cy.get('.navbar-nav > :nth-child(3) > .nav-link').click() 
            cy.get('[href="/user/lk/index"]').should('have.text', 'Личный кабинет').click()
            cy.get('tbody > :nth-child(1) > :nth-child(3) > a').click()
            cy.get(':nth-child(1) > tbody > :nth-child(1) > :nth-child(2)').should('have.text', '345-43-45')
            cy.get(':nth-child(1) > tbody > :nth-child(2) > :nth-child(2)').should('have.text', 'Москва, Зенитная улица, д.20')
            
            cy.log('Check order number in url and order list')
            cy.get('.active').then(($li) => {
                const orderNum = parseInt($li.text().replace(/[^0-9]/g,''))
                cy.window().then((win) => {
                    const url = win.location.href;
                    const urlHashOrder = parseInt(url.toString().replace('http://shop.bugred.ru/user/lk/show/',''))
                
                    expect(orderNum).to.eq(urlHashOrder)
                }) 
            }) 
        })
    })
});