/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginUser(email: string, password: string): Chainable<any>;
    }
}

Cypress.Commands.add('loginUser', (email: string, password: string) => {
    cy.intercept('POST', 'http://localhost:8080/api/auth/login', {
        statusCode: 200,
        body: {
            token: 'supertoken',
        },
    }).as('loginRequest');

    cy.visit('http://localhost:4200/auth/login');
    cy.get('mat-label').contains("E-mail ou nom d\'utilisateur").click();
    cy.get('input[name="username"]').type(email);
    cy.get('mat-label').contains("Mot de passe").click();
    cy.get('input[type="password"]').type(password);
    cy.get('button').contains("Se connecter").click();

    cy.wait('@loginRequest');
})