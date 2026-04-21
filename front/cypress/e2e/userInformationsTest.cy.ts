describe('user Informations Tests', () => {

    it('should display user informations and unsubscribe from theme 4', () => {
        cy.loginUser("test", "test1234!A");

        cy.intercept('GET', 'http://localhost:8080/api/auth/me', {
            statusCode: 200,
            body: {
                id: 1,
                name: 'pedro',
                email: 'pedro@gmail.com',
            }
        }).as('getMeRequest');

        cy.intercept('GET', 'http://localhost:8080/api/subscribes', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    userId: 1,
                    themeId: 1,
                }
            ]
        }).as('getSubscribesRequest');

        cy.intercept('GET', 'http://localhost:8080/api/theme/1', {
            statusCode: 200,
            body: {
                id: 1,
                name: 'sport',
                content: 'article de sport',
            },
        }).as('getThemeNameByIdRequest');

        cy.intercept('POST', 'http://localhost:8080/api/unsubscribe/1', {
            statusCode: 200,
        }).as('unsubscribeRequest');


        cy.visit('http://localhost:4200/profile/me');

        cy.wait('@getMeRequest');
        cy.wait('@getSubscribesRequest');
        cy.wait('@getThemeNameByIdRequest');

        cy.get('input[ng-reflect-model="pedro"]');
        cy.get('input[ng-reflect-model="pedro@gmail.com"]');

        cy.get('h2').contains('sport');

        cy.get('span[class="mdc-button__label"]').contains('Se désabonner').click();
        cy.wait('@unsubscribeRequest');

        cy.get('h2').contains('sport').should('not.exist');


    })

    it('should display then update profile informations', () => {

        cy.loginUser('test', 'test1234!A');

        cy.intercept('GET', 'http://localhost:8080/api/auth/me', {
            statusCode: 200,
            body: {
                id: 1,
                name: 'pedro',
                email: 'pedro@gmail.com',
            }
        }).as('getMeRequest');

        cy.intercept('GET', 'http://localhost:8080/api/subscribes', {
            statusCode: 200,
            body: null,
        }).as('getSubscribesRequest');


        cy.visit('http://localhost:4200/profile/me');

        cy.wait('@getMeRequest');
        cy.wait('@getSubscribesRequest');


        cy.get('input[ng-reflect-model="pedro"]');
        cy.get('input[ng-reflect-model="pedro@gmail.com"]');

        cy.get('input[ng-reflect-model="pedro"]').type('pedra');
        cy.get('button').contains('Sauvegarder').click();

        cy.get('input[ng-reflect-model="pedropedra"]');
        cy.get('input[ng-reflect-model="pedro@gmail.com"]');
    })
})