import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { userEntity } from "src/app/core/models/userEntity";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.baseUrl;
    private user$ = new BehaviorSubject<userEntity>(new userEntity);

    constructor(private http: HttpClient) { }

    /**
     * Get user by its id
     * @param id : user id
     * @returns Observable<userEntity>
     */
    public getUserById(id: Number): Observable<userEntity> {
        return this.http.get<userEntity>(`${this.apiUrl}user/` + id).pipe(
            tap(user => this.user$.next(user)));
    }

    /**
     * Get User name by its id
     * @param id : user id 
     * @returns Observable<string>
     */
    public getUsernameById(id: Number): Observable<string> {
        return this.getUserById(id).pipe(
            map(user => user.name)
        );
    }

    /**
     * Get connected user profile
     * @returns Observable<userEntity>
     */
    public getMe(): Observable<userEntity> {
        return this.http.get<userEntity>(`${this.apiUrl}auth/me`);
    }

    /**
     * Update user credentials
     * @param user : user credentials
     * @returns Observable<userEntity>
     */
    public updateMe(user: userEntity): Observable<userEntity> {
        return this.http.put<userEntity>(`${this.apiUrl}profile/me`, user);
    }


}