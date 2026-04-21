describe('navigationTests', () => {
    
    it('should test all navigations possibilities', () => {
        cy.loginUser('test', 'test1234!A');
        
        
        cy.get('a').contains('Articles').click();
        cy.url().should('include', '/articles/home');
        
        cy.get('a').contains('Thèmes').click();
        cy.url().should('include', '/articles/themes');
        
        cy.get('img[alt="mddapi_logo"]').click();
        cy.url().should('include', '/articles/home');
        
        cy.get('mat-icon').contains('account_circle').click();
        cy.url().should('include', '/profile/me');

        cy.get('span').contains('Se déconnecter').click();
        cy.get('h1').contains('Welcome to MDD');

        cy.get('span').contains('Commencer').click();
        cy.url().should('include', '/auth');

        cy.get('button').contains('Se connecter').click();
        cy.url().should('include', '/auth/login');
        cy.get('mat-icon').contains('arrow_back').click();

        cy.url().should('include', '/auth');
        cy.get('button').contains('S\'inscrire').click();
        cy.url().should('include', '/auth/register');
        cy.get('mat-icon').contains('arrow_back').click();

        cy.url().should('include', '/auth');


    })

})