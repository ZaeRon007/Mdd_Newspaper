describe('theme tests', () => {

    it('should display themes', () => {
        cy.loginUser('test', 'test1234!A');

        cy.intercept('GET', 'http://localhost:8080/api/themes', {
            statusCode: 200,
            body: [
                {
                    id:1,
                    name:'sport',
                    content:'content',
                },
                {
                    id:2,
                    name:'cuisine',
                    content:'content',
                },
                {
                    id:3,
                    name:'actualité',
                    content:'content',
                },
                {
                    id:4,
                    name:'lecture',
                    content:'content',
                },
                {
                    id:5,
                    name:'politique',
                    content:'content',
                },
            ]
        }).as('getThemesRequest');

        cy.intercept('GET', 'http://localhost:8080/api/subscribe/1', {
            statusCode: 200,
            body: true,
        }).as('isSubscribeToTheme1');

        cy.intercept('GET', 'http://localhost:8080/api/subscribe/2', {
            statusCode: 200,
            body: true,
        }).as('isSubscribeToTheme2');

        cy.intercept('GET', 'http://localhost:8080/api/subscribe/3', {
            statusCode: 200,
            body: false,
        }).as('isSubscribeToTheme3');

        cy.intercept('GET', 'http://localhost:8080/api/subscribe/4', {
            statusCode: 200,
            body: true,
        }).as('isSubscribeToTheme4');

        cy.intercept('GET', 'http://localhost:8080/api/subscribe/5', {
            statusCode: 200,
            body: true,
        }).as('isSubscribeToTheme5');

        cy.intercept('POST', 'http://localhost:8080/api/subscribe/3', {
            statusCode: 200,
        }).as('subscribeRequest');

        cy.visit('http://localhost:4200/articles/themes');

        cy.wait('@getThemesRequest');

        cy.wait('@isSubscribeToTheme1');
        cy.wait('@isSubscribeToTheme2');
        cy.wait('@isSubscribeToTheme3');
        cy.wait('@isSubscribeToTheme4');
        cy.wait('@isSubscribeToTheme5');

        cy.get('h2').contains('sport');
        cy.get('h2').contains('cuisine');
        cy.get('h2').contains('actualité');
        cy.get('h2').contains('lecture');
        cy.get('h2').contains('politique');
        
        cy.get('span[class="mdc-button__label"]').contains('S\'abonner').click();
        cy.wait('@subscribeRequest');

        cy.get('span[class="mdc-button__label"]').contains('S\'abonner').should('not.exist');
    })
})