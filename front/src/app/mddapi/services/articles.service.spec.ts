import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from "@angular/common/http";
import { ArticleService } from "./articles.service";
import { ThemeService } from "./theme.service";
import { UserService } from "./user.service";
import { of } from "rxjs";

describe('ComponentService', () => {
    let articlesService: ArticleService;
    let httpMock: HttpTestingController;

    let mockUserService: any;
    let mockThemeService: any;

    beforeEach(() => {
        mockUserService = {
            getUsernameById: jest.fn(),
        }

        mockThemeService = {
            getThemeNameById: jest.fn(),
            getThemeById: jest.fn(),
            fetch: jest.fn(),
        }

        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                ArticleService,
                { provide: ThemeService, useValue: mockThemeService },
                { provide: UserService, useValue: mockUserService },
            ],
        })

        articlesService = TestBed.inject(ArticleService);
        httpMock = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpMock.verify();
    });

    it('should found an article by id', () => {
        const mockArticle = {
            id: 1,
            themeId: 1,
            title: 'Sport',
            content: 'content',
            createdAt: '04/02/2026',
            userId: 1
        };

        articlesService.getArticleById(1).subscribe((response) => {
            expect(response).toEqual(mockArticle);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/article/1');
        expect(request.request.method).toEqual('GET');

        request.flush(mockArticle);
    });

    it('should found all subscribes', () => {
        const mockSubscribes = [
            {
                id: 1,
                userId: 1,
                themeId: 1,
            },
            {
                id: 2,
                userId: 2,
                themeId: 2,
            },
            {
                id: 3,
                userId: 3,
                themeId: 3,
            },
        ];

        articlesService.getAllSubscribes().subscribe((response) => {
            expect(response).toEqual(mockSubscribes);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/subscribes');
        expect(request.request.method).toEqual('GET');

        request.flush(mockSubscribes);
    });

    it('should found all articles for a theme id', () => {
        const mockArticles = [
            {
                id: 1,
                themeId: 1,
                title: 'Sport',
                content: 'content',
                createdAt: '04/02/2026',
                userId: 1
            },
            {
                id: 2,
                themeId: 1,
                title: 'Sport',
                content: 'content',
                createdAt: '04/02/2026',
                userId: 2
            },
            {
                id: 3,
                themeId: 1,
                title: 'Sport',
                content: 'content',
                createdAt: '04/02/2026',
                userId: 3
            },
        ];

        articlesService.getArticlesByThemeId(1).subscribe((response) => {
            expect(response).toEqual(mockArticles);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/subscribes/theme/1');
        expect(request.request.method).toEqual('GET');

        request.flush(mockArticles);
    });

    it('should return a boolean if user suscribed to theme', () => {
        const boolean = true;

        articlesService.isSubscribedToTheme(1).subscribe((response) => {
            expect(response).toEqual(boolean);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/subscribe/1');
        expect(request.request.method).toEqual('GET');

        request.flush(boolean);
    });

    it('should setup a single article', (done) => {
        const mockArticles = {
            id: 1,
            themeId: 1,
            title: 'Sport',
            content: 'content',
            createdAt: '04/02/2026',
            userId: 1
        };

        mockUserService.getUsernameById.mockReturnValue(of('roberto'));

        mockThemeService.getThemeNameById.mockReturnValue(of('sport'));

        articlesService.setupSingleArticle('1').subscribe((response) => {
            expect(response).toEqual({
                id: 1,
                title: 'Sport',
                content: 'content',
                date: '04/02/2026',
                theme: 'sport',
                user: 'roberto'
            });
            done();
        });

        const request = httpMock.expectOne('http://localhost:8080/api/article/1');
        expect(request.request.method).toEqual('GET');

        request.flush(mockArticles);
    });

    it('should setup articles', (done) => {
        const mockArticlesTheme1 = [
            { id: 1, title: 'Sport', content: 'content', createdAt: '04/02/2026', themeId: 1, userId: 1 }
        ];

        const mockArticlesTheme2 = [
            { id: 5, title: 'Sport', content: 'content', createdAt: '04/02/2026', themeId: 2, userId: 1 }
        ];

        const mockArticlesTheme3 = [
            { id: 8, title: 'Sport', content: 'content', createdAt: '04/02/2026', themeId: 3, userId: 1 }
        ];

        const mockGetAllSubscribes = [
            { id: 1, userId: 1, themeId: 1, },
            { id: 2, userId: 1, themeId: 2, },
            { id: 3, userId: 1, themeId: 3, },
        ];

        mockUserService.getUsernameById.mockReturnValue(of('roberto'));
        mockThemeService.getThemeNameById.mockImplementation((id: number) => of(`theme${id}`));

        articlesService.setupArticles().subscribe((response) => {
            expect(response).toEqual([
                { id: 1, title: 'Sport', theme: 'theme1', content: 'content', date: '04/02/2026', user: 'roberto', },
                { id: 5, title: 'Sport', theme: 'theme2', content: 'content', date: '04/02/2026', user: 'roberto', },
                { id: 8, title: 'Sport', theme: 'theme3', content: 'content', date: '04/02/2026', user: 'roberto', },
            ]);
            done();
        })

        httpMock.expectOne('http://localhost:8080/api/subscribes').flush(mockGetAllSubscribes);
        httpMock.expectOne('http://localhost:8080/api/subscribes/theme/1').flush(mockArticlesTheme1);
        httpMock.expectOne('http://localhost:8080/api/subscribes/theme/2').flush(mockArticlesTheme2);
        httpMock.expectOne('http://localhost:8080/api/subscribes/theme/3').flush(mockArticlesTheme3);

    });

    it('should create article', () => {
        const mockArticle = {
            themeId: 1,
            title: 'title',
            content: 'content'
        };

        articlesService.createArticle(mockArticle).subscribe(response => {
            expect(response).toEqual(mockArticle);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/article')
        expect(request.request.method).toBe('POST');
        request.flush(mockArticle);
    });

    it('should setup theme subscription display', (done) => {
        const mockGetAllSubscribes = [
            { id: 1, userId: 1, themeId: 1, },
            { id: 2, userId: 1, themeId: 2, },
            { id: 3, userId: 1, themeId: 3, },
        ];

        mockThemeService.getThemeById.mockImplementation((id: number) => {
            switch (id) {
                case 1:
                    return of({ id: 1, name: 'title1', content: 'content1', subscribed: true });
                case 2:
                    return of({ id: 2, name: 'title2', content: 'content2', subscribed: true });
                case 3:
                    return of({ id: 3, name: 'title3', content: 'content3', subscribed: true });
            }
            return of(null);
        });

        articlesService.setupThemeSubscriptionDisplay().subscribe(response => {
            expect(response).toEqual([
                { id: 1, title: 'title1', content: 'content1', subscribed: true },
                { id: 2, title: 'title2', content: 'content2', subscribed: true },
                { id: 3, title: 'title3', content: 'content3', subscribed: true },
            ]);
            done();
        });

        const request = httpMock.expectOne('http://localhost:8080/api/subscribes');
        expect(request.request.method).toBe('GET');
        request.flush(mockGetAllSubscribes);
    });

    it('should setup display themes informations', (done) => {
        const mockThemes = [
            { id: 1, name: 'Sport', content: 'content' },
            { id: 2, name: 'Cuisine', content: 'content' },
            { id: 3, name: 'Actualités', content: 'content' },
        ];

        mockThemeService.fetch.mockReturnValue(of(mockThemes));

        articlesService.setupDisplayThemes().subscribe(response => {
            expect(response).toEqual([
                { id: 1, title: 'Sport', content: 'content', subscribed: true },
                { id: 2, title: 'Cuisine', content: 'content', subscribed: false },
                { id: 3, title: 'Actualités', content: 'content', subscribed: true },
            ]);
            done();
        });

        httpMock.expectOne('http://localhost:8080/api/subscribe/1').flush(true);
        httpMock.expectOne('http://localhost:8080/api/subscribe/2').flush(false);
        httpMock.expectOne('http://localhost:8080/api/subscribe/3').flush(true);


    });
});
