import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from "@angular/common/http";

describe('UserService', () => {
    let userService: UserService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                UserService,
            ],
        })

        userService = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

    })

    afterEach(() => {
        httpMock.verify();
    });

    it('should found user by its id', () => {
        const expectedUser = {
            name: 'roberto',
            email: 'roberto@gmail.com'
        };

        userService.getUserById(1).subscribe((user) => {
            expect(user).toBe(expectedUser);
        })

        const request = httpMock.expectOne('http://localhost:8080/api/user/1');
        expect(request.request.method).toBe('GET');

        request.flush(expectedUser);
    });

    it('should found username by user id', () => {
        const expectedUser = {
            name: 'roberto',
            email: 'roberto@gmail.com'
        };

        userService.getUsernameById(1).subscribe((user) => {
            expect(user).toBe(expectedUser.name);
        })

        const request = httpMock.expectOne('http://localhost:8080/api/user/1');
        expect(request.request.method).toBe('GET');

        request.flush(expectedUser);
    });

    it('should get connected user informations', () => {
        const expectedUser = {
            name:'roberto',
            email:'roberto@gmail.com'
        }

        userService.getMe().subscribe((user) => {
            expect(user).toBe(expectedUser);
        })

        const request = httpMock.expectOne('http://localhost:8080/api/auth/me');
        expect(request.request.method).toBe('GET');

        request.flush(expectedUser);
         
    });

    it('should update user informations', () =>  {
        const userToUpdate = {
            name:'roberto',
            email:'roberto@gmail.com'
        }

        const expectedUser = {
            name:'roberta',
            email:'roberta@gmail.com'
        }

        userService.updateMe(userToUpdate).subscribe((user) => {
            expect(user).toBe(expectedUser);
        });

        const request = httpMock.expectOne('http://localhost:8080/api/profile/me');
        expect(request.request.method).toBe('PUT');

        expect(request.request.body).toEqual(userToUpdate);
        
        request.flush(expectedUser);

    });

});