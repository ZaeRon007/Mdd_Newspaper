import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { DisplayThemes } from "src/app/core/models/dto/displayTheme";
import { SubscribeEntity } from "src/app/core/models/subscribeEntity";
import { themeEntity } from "src/app/core/models/themeEntity";
import { environment } from "src/environments/environment.prod";
import { ArticleService } from "./articles.service";

@Injectable({
    providedIn: 'root'
})
export class ThemeService implements OnInit {
    private apiUrl = environment.baseUrl;
    private themes$ = new BehaviorSubject<themeEntity[]>([new themeEntity]);
    private theme$ = new BehaviorSubject<themeEntity>(new themeEntity);

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetch();
    }

    /**
     * Get all themes
     * @returns Observable<themeEntity[]>
     */
    public fetch(): Observable<themeEntity[]> {
        return this.http.get<themeEntity[]>(`${this.apiUrl}themes`).pipe(
            tap(themes => this.themes$.next(themes)));
    }

    /**
     * Get theme by id
     * @param id : theme id
     * @returns Observable<themeEntity>
     */
    public getThemeById(id: Number): Observable<themeEntity> {
        return this.http.get<themeEntity>(`${this.apiUrl}theme/` + id).pipe(
            tap(theme => this.theme$.next(theme)));
    }

    /**
     * Get theme name by id
     * @param id : theme id
     * @returns Observable<string>
     */
    public getThemeNameById(id: Number): Observable<string> {
        return this.getThemeById(id).pipe(
            map(theme => theme.name)
        );
    }

    /**
     * Subscribe to a theme
     * @param id : theme id
     * @returns Observable<void>
     */
    public subscribeToTheme(id: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}subscribe/` + id, null);
    }

    /**
     * Unsubscribe to a theme
     * @param id : theme id
     * @returns Observable<void>
     */
    public unSubscribeToTheme(id: number): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}unsubscribe/` + id, null);
    }
}