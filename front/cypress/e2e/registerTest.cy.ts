describe('register Tests', () => {

    it('should register user', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {
            statusCode: 200,
            body: {
                token: 'supertoken',
            },
        }).as('registerRequest');

        cy.visit('http://localhost:4200/auth/register');

        cy.get('mat-label').contains('Nom d\'utilisateur').click();
        cy.get('input[name="name"]').type('pedro');
        cy.get('mat-label').contains('Adresse e-mail').click();
        cy.get('input[name="email"]').type('pedro@gmail.com');
        cy.get('mat-label').contains('Mot de passe').click();
        cy.get('input[name="password"]').type('test1234!A');
        cy.get('button').contains('S\'inscrire').click();

        cy.wait('@registerRequest');

        cy.url().should('include','/articles/home');

    })

    it('should display an error', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {
            statusCode: 401,
        }).as('registerRequest');

        cy.visit('http://localhost:4200/auth/register');

        cy.get('mat-label').contains('Nom d\'utilisateur').click();
        cy.get('input[name="name"]').type('pedro');
        cy.get('mat-label').contains('Adresse e-mail').click();
        cy.get('input[name="email"]').type('pedro@gmail.com');
        cy.get('mat-label').contains('Mot de passe').click();
        cy.get('input[name="password"]').type('test1234!A');
        cy.get('button').contains('S\'inscrire').click();

        cy.wait('@registerRequest');

        cy.get('p').contains('L\'adresse E-mail existe déjà !')
    })
})