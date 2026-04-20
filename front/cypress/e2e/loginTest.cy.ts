describe('login tests', () => {

    it('should login user', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
            statusCode: 200,
            body: {
                token: 'supertoken',
            },
        }).as('loginRequest');
    
        cy.visit('http://localhost:4200/auth/login');
        cy.get('mat-label').contains("E-mail ou nom d\'utilisateur").click();
        cy.get('input[name="username"]').type('test');
        cy.get('mat-label').contains("Mot de passe").click();
        cy.get('input[type="password"]').type('test1234!A');
        cy.get('button').contains("Se connecter").click();

        cy.wait('@loginRequest');

        cy.url().should('include','/articles/home');
    })

    it('should display an error', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
            statusCode: 401,
        }).as('loginRequest');


        cy.visit('http://localhost:4200/auth/login');
        cy.get('mat-label').contains("E-mail ou nom d\'utilisateur").click();
        cy.get('input[name="username"]').type('wrongUsername');
        cy.get('mat-label').contains("Mot de passe").click();
        cy.get('input[type="password"]').type('wrongPassword');
        cy.get('button').contains("Se connecter").click();

        cy.wait('@loginRequest');

        cy.get('p').contains("L'adresse e-mail ou le mot de passe est invalide !");
    })
})