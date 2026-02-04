import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from "@angular/common/http";
import { ThemeService } from "./theme.service";

describe('ThemeSercice', () => {
    let themeService: ThemeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                ThemeService,
            ],
        })

        themeService = TestBed.inject(ThemeService);
        httpMock = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch component', () => {

        const mockThemeResponse = [
            {
                id: 1,
                name: 'sport',
                content: 'content'
            },
            {
                id: 2,
                name: 'cuisine',
                content: 'content'
            },
            {
                id: 3,
                name: 'actualités',
                content: 'content'
            },
        ]

        themeService.fetch().subscribe((themes) => {
            expect(themes).toBe(mockThemeResponse);
        })

        const request = httpMock.expectOne(`http://localhost:8080/api/themes`);
        expect(request.request.method).toBe('GET');

        request.flush(mockThemeResponse);
    });

    it('should found theme by id', () => {
        const mockThemeResponse = {
            id:1,
            name:'sport',
            content:'content'
        };

        themeService.getThemeById(1).subscribe((theme) => {
            expect(theme).toBe(mockThemeResponse);
        });

        const request = httpMock.expectOne(`http://localhost:8080/api/theme/1`);
        expect(request.request.method).toBe('GET');

        request.flush(mockThemeResponse);
    });

    it('should found theme name by id', () => {
        const mockThemeResponse = 'sport';

        themeService.getThemeNameById(1).subscribe((name) => {
            expect(name).toBe(mockThemeResponse);
        });

        const request = httpMock.expectOne(`http://localhost:8080/api/theme/1`);
        expect(request.request.method).toBe('GET');

        request.flush(mockThemeResponse);
    });

    it('should subscribe to theme', () => {
        themeService.subscribeToTheme(1).subscribe(() =>{

        });

        const request = httpMock.expectOne(`http://localhost:8080/api/subscribe/1`);
        expect(request.request.method).toBe('POST');

        request.flush(null);
    });

    it('should unsubscribe to theme', () => {
        themeService.unSubscribeToTheme(1).subscribe(() =>{

        });

        const request = httpMock.expectOne(`http://localhost:8080/api/unsubscribe/1`);
        expect(request.request.method).toBe('POST');

        request.flush(null);
    });
});