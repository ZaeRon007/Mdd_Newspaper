import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from "@angular/common/http";
import { CommentService } from "./comment.service";
import { UserService } from "./user.service";
import { of } from "rxjs";

describe('ComponentSercice', () => {
    let commentService: CommentService;
    let httpMock: HttpTestingController;

    let mockUserService: any;

    beforeEach(() => {
        mockUserService = {
            getUserById: jest.fn(),
        }

        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                CommentService,
                { provide: UserService, useValue: mockUserService },
            ],
        })

        commentService = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpMock.verify();
    });

    it('should found comments by article ID', (done) => {
        const mockCommentsResponse = [
            {
                userId: 1,
                content: 'content'
            },
            {
                userId: 2,
                content: 'content'
            },
            {
                userId: 3,
                content: 'content'
            },
        ];

        const roberto = {
            name:'roberto',
        };

        const pedro = {
            name:'pedro',
        };

        const alberto = {
            name:'alberto',
        };

        mockUserService.getUserById.mockImplementation((id: number) => {
            switch (id) {
                case 1:
                    return of(roberto);
                case 2:
                    return of(pedro);
                case 3:
                    return of(alberto);
            };
            return of(null);
        });

        commentService.getCommentsByArticleId(1).subscribe((res) => {
            expect(res).toEqual([
                {
                    user:'roberto',
                    content:'content'
                },
                {
                    user:'pedro',
                    content:'content'
                },
                {
                    user:'alberto',
                    content:'content'
                },
            ]);
            done();
        });

        const request = httpMock.expectOne('http://localhost:8080/api/comment/article/1');
        expect(request.request.method).toBe('GET');

        request.flush(mockCommentsResponse);
        
        expect(mockUserService.getUserById).toHaveBeenCalledTimes(3);
        expect(mockUserService.getUserById).toHaveBeenCalledWith(1);
        expect(mockUserService.getUserById).toHaveBeenCalledWith(2);
        expect(mockUserService.getUserById).toHaveBeenCalledWith(3);
    });

    it('should post a comment', () => {
        const mockCommentsResponse = {
            user: 'roberto',
            content: 'content'
        };

        commentService.postComment(1, 'message').subscribe();

        const request = httpMock.expectOne('http://localhost:8080/api/comment/article/1');
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toBe('message');

        request.flush(mockCommentsResponse);
    });

});