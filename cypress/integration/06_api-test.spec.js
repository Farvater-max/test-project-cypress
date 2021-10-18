describe('Test api endpoint shop', () => {
    it('Get item success', () => {
        cy.request('GET', 'http://shop.bugred.ru/api/items/get/', { "id": '51' }).then(
            (response) => {
                expect(response.body.result).to.have.property('name', 'Шортики') 
                expect(response.body.result).to.have.property('section', 'Платья') 
                expect(response.body.result).to.have.property('description', 'Модное платье из новой коллекции!') 
                expect(response.body.result).to.have.property('color', 'RED') 
                expect(response.body.result).to.have.property('size', '44') 
                expect(response.body.result).to.have.property('params', '') 
                expect(response.body.result).to.have.property('photo', 'http://shop.bugred.ruhttps://via.placeholder.com/300x300') 
            }
        )
    })
    it('Get item price', () => {
        cy.request('GET', 'http://shop.bugred.ru/api/items/get/', { "id": '5' }).then(
            (response) => {
                expect(response.body.result).to.have.property('price', 1500)  
            }
        )
    })
    it('Get without id', () => {
        cy.request('GET', 'http://shop.bugred.ru/api/items/get/').then(
            (response) => {
                expect(response.body).to.have.property('error', 'id_not_filled')  
                expect(response.body).to.have.property('message', 'Поле ID товара  не заполнено')  
            }
        )
    })
    it('Get item not found', () => {
        cy.request('GET', 'http://shop.bugred.ru/api/items/get/', {"id": '567'}).then(
            (response) => {
                expect(response.body).to.have.property('error', 'item_with_id_not_found')  
                expect(response.body).to.have.property('message', 'Товар с ID 567 не найден!')  
            }
        )
    })
    it('Get query select item', () => {
        cy.request('GET', 'http://shop.bugred.ru/api/items/select/', {"sql_query": "select * from items where last_id = 2;"}).then(
            (response) => {
                expect(response.body.result[0]).to.have.property('title', 'Товар 2') 
                expect(response.body.result[0]).to.have.property('price', '1000') 
                expect(response.body.result[0]).to.have.property('image', '/files/tmpfiles/avatar_big.jpg') 
                expect(response.body.result[0]).to.have.property('category', '1') 
                expect(response.body.result[0]).to.have.property('sort', '2') 
            }
        )
    })
    it('POST Create item', () => {
        cy.fixture('example.json').then(data => {
            cy.request('POST', 'http://shop.bugred.ru/api/items/create/', 
            {
                "name":"Вечернее платье",
                "section":"Платья",
                "description":"Платье для активного времяпрепровождения",
                "color":"BLUE",
                "size":44,
                "price":1599,
                "params":"dress",
                "photo": data.image
            }).then(
                (response) => {
                    expect(response.body.result).to.have.property('name','Вечернее платье') 
                    expect(response.body.result).to.have.property('price', 1599) 
                    expect(response.body.result).to.have.property('color', 'BLUE') 
                    expect(response.body.result).to.have.property('params', 'dress') 
                    expect(response.body.result).to.have.property('description', 'Платье для активного времяпрепровождения')
                }
            )
        })
    })
});
