describe('Login page', () => {
    it('Open log in pages and check fields and email validation', () => {
        cy.fixture('example.json').then(data => {
            cy.log('Enter to main page')
            cy.visit(data.main_url)
            cy.get('title').should('have.text', 'Тестирование')

            cy.log('Search enter tab')            
            cy.get('.navbar-nav > :nth-child(4) > .nav-link').click()
            
            cy.log('Enter to login page')
            cy.get('.breadcrumb-item.active').should('have.text', 'Авторизация')
            
            cy.log('Check placeholder')
            cy.get('#exampleInputEmail1').invoke('attr', 'placeholder').should('contain', 'Введите email') 
            cy.get('#exampleInputPassword1').invoke('attr', 'placeholder').should('contain', 'Введите пароль') 
            
            cy.log('Submit if fields empty')
            cy.get(':nth-child(1) > form > .btn').should('have.text', 'Войти').click()
            cy.wait(500)
            cy.get('#exampleInputEmail1').invoke('prop', 'validationMessage')
                .should('equal', 'Please fill out this field.')
        })
     })
        
     it('Fields validation and log in', () => {
         cy.fixture('example.json').then(data => {
            cy.log('Enter to login page')
            cy.visit(data.login_url)
            cy.get('#exampleInputEmail1').type('1234')
            cy.get('#exampleInputEmail1').invoke('prop', 'validationMessage')
                .should('equal', 'Адрес электронной почты должен содержать символ "@". В адресе "1234" отсутствует символ "@".')

            cy.get('#exampleInputEmail1').type('login@')
            cy.get('#exampleInputEmail1').invoke('prop', 'validationMessage')
                .should('equal', 'Введите часть адреса после символа "@". Адрес "1234login@" неполный.')
        
            cy.get('#exampleInputEmail1').type('mail.ru')
            cy.get('#exampleInputPassword1').invoke('prop', 'validationMessage')
                .should('equal', 'Заполните это поле.')

            cy.log('Enter valid data') 
            cy.get('#exampleInputEmail1').type('{selectall}{backspace}')
            cy.get('#exampleInputEmail1').type(data.login)
            cy.get('#exampleInputPassword1').type(data.password)
            cy.get(':nth-child(1) > form > .btn').should('have.text', 'Войти').click()

            cy.log('Log in shop and cross to main page with new tab')            
            cy.get('.navbar-nav > :nth-child(3) > .nav-link').should('have.text', '\n                                Test                            ')   

            cy.get('.navbar-nav > :nth-child(3) > .nav-link').click() 
            cy.get('.nav-item.show > .dropdown-menu')
            cy.get('[href="/user/setup/index"]').should('have.text', 'Настройки')
            cy.get('[href="/user/lk/index"]').should('have.text', 'Личный кабинет')
            cy.get('[href="/user/lk/logout"]').should('have.text', 'Выйти')
        })
    })
});
