describe('navigationTests', () => {
    
    it('should test all navigations possibilities', () => {
        cy.loginUser('test', 'test1234!A');
        
        cy.get('mat-icon').contains('account_circle').click();
        cy.url().should('include', '/profile/me');

        cy.get('a').contains('Articles').click();
        cy.url().should('include', '/articles/home');

        cy.get('a').contains('Thèmes').click();
        cy.url().should('include', '/articles/themes');

        cy.get('img[alt="mddapi_logo"]').click();
        cy.url().should('include', '/articles/home');

    })

})