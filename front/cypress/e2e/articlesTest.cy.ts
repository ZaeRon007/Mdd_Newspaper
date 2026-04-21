describe('articles tests', () => {

    it('should display articles then focus on first', () => {
        cy.intercept('GET', 'http://localhost:8080/api/subscribes', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    userId: 1,
                    themeId: 1,
                },
            ]
        }).as('getSubscribesRequest');

        cy.intercept('GET', 'http://localhost:8080/api/subscribes/theme/1', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    themeId: 1,
                    title: 'article 1',
                    content: 'content',
                    createdAt: '2026-02-05 22:41:16',
                    userId: 1,
                },
                {
                    id: 2,
                    themeId: 1,
                    title: 'article 2',
                    content: 'content',
                    createdAt: '2026-02-05 22:41:16',
                    userId: 1,
                },
            ],
        }).as('getArticlesByThemeIdRequest');

        cy.intercept('GET', 'http://localhost:8080/api/user/1', {
            statusCode: 200,
            body: {
                name: 'pedro',
                email: 'pedro@gmail.com',
            },
        }).as('getUsernameByIdRequest');

        cy.intercept('GET', 'http://localhost:8080/api/theme/1', {
            statusCode: 200,
            body: {
                id: 1,
                name: 'sport',
                content: 'article de sport',
            },
        }).as('getThemeNameByIdRequest');

        cy.intercept('GET', 'http://localhost:8080/api/article/1', {
            statusCode: 200,
            body: {
                id: 1,
                themeId: 1,
                title: 'article 1',
                content: 'content',
                createdAt: '2026-02-05 22:41:16',
                userId: 1,
            }
        }).as('getSingleArticle1Request');

        cy.intercept('GET', 'http://localhost:8080/api/comment/article/1', {
            statusCode: 200,
            body: [
                {
                    id: 1,
                    userId: 1,
                    content: 'super article',
                },
            ]
        }).as('getCommentForArticle1');

        cy.intercept('GET', 'http://localhost:8080/api/article/2', {
            statusCode: 200,
            body: {
                id: 2,
                themeId: 1,
                title: 'article 2',
                content: 'content',
                createdAt: '2026-02-05 22:41:16',
                userId: 1,
            }
        }).as('getSingleArticle2Request');

        cy.intercept('GET', 'http://localhost:8080/api/comment/article/2', {
            statusCode: 200,
            body: null,
        }).as('getCommentForArticle2');

        cy.intercept('POST', 'http://localhost:8080/api/comment/article/1', {
            statusCode: 200,
            body: {
                user: 'Roberto de la vega',
                content: 'super article',
            }
        }).as('postCommentRequest');

        cy.loginUser('test', 'test1234!A');

        cy.wait('@getSubscribesRequest');
        cy.wait('@getArticlesByThemeIdRequest');
        cy.wait('@getUsernameByIdRequest');
        cy.wait('@getThemeNameByIdRequest');

        cy.get('h2').contains('article 1');
        cy.get('h2').contains('article 2');
        cy.get('p[class="capitalized"]').contains('pedro');

        // single article 
        cy.get('mat-card[ng-reflect-router-link="/articles/view,1"]').click();

        cy.wait('@getSingleArticle1Request');
        cy.wait('@getUsernameByIdRequest');
        cy.wait('@getThemeNameByIdRequest');
        cy.wait('@getCommentForArticle1');
        cy.wait('@getUsernameByIdRequest');

        cy.get('mat-label').contains('Ecrivez ici votre commentaire').click();
        cy.get('input[id="mat-input-2"]').type('comment example');
        cy.get('mat-icon').contains('send').click();

        cy.wait('@postCommentRequest');
        cy.get('p[class="capitalized"]').contains('Roberto de la vega');

        // accueil
        cy.get('mat-icon').contains('arrow_back').click();

        cy.wait('@getSubscribesRequest');
        cy.wait('@getArticlesByThemeIdRequest');
        cy.wait('@getUsernameByIdRequest');
        cy.wait('@getThemeNameByIdRequest');

        // single article
        cy.get('mat-card[ng-reflect-router-link="/articles/view,2"]').click();

        cy.wait('@getSingleArticle2Request');
        cy.wait('@getUsernameByIdRequest');
        cy.wait('@getThemeNameByIdRequest');
        cy.wait('@getCommentForArticle2');
        cy.wait('@getUsernameByIdRequest');

    })
})