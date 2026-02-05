import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { ArticleEntity } from "src/app/core/models/articleEntity";
import { SubscribeEntity } from "src/app/core/models/subscribeEntity";
import { environment } from "src/environments/environment.prod";
import { ThemeService } from "./theme.service";
import { UserService } from "./user.service";
import { DisplayArticle } from "src/app/core/models/dto/displayArticle";
import { CreateArticle } from "src/app/core/models/dto/createArticle";
import { DisplayThemes } from "src/app/core/models/dto/displayTheme";
import { themeEntity } from "src/app/core/models/themeEntity";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.baseUrl;
  private articles$ = new BehaviorSubject<ArticleEntity[]>([new ArticleEntity]);
  private article$ = new BehaviorSubject<ArticleEntity>(new ArticleEntity);
  private subscribes$ = new BehaviorSubject<SubscribeEntity[]>([new SubscribeEntity]);

  constructor(private http: HttpClient,
    private userService: UserService,
    private themeService: ThemeService) { }

  /**
   * Get an article by its id
   * @param id : article id
   * @returns Observable<ArticleEntity>
   */
  public getArticleById(id: number): Observable<ArticleEntity> {
    return this.http.get<ArticleEntity>(`${this.apiUrl}article/` + id).pipe(
      tap(article => this.article$.next(article))
    );
  }

  /**
   * Get all subscribes for connected user
   * @returns Observable<SubscribeEntity[]>
   */
  public getAllSubscribes(): Observable<SubscribeEntity[]> {
    return this.http.get<SubscribeEntity[]>(`${this.apiUrl}subscribes`).pipe(
      tap(themes => this.subscribes$.next(themes))
    )
  }

  /**
   * Get all articles for a theme
   * @param id : theme id
   * @returns Observable<ArticleEntity[]>
   */
  public getArticlesByThemeId(id: number): Observable<ArticleEntity[]> {
    return this.http.get<ArticleEntity[]>(`${this.apiUrl}subscribes/theme/` + id).pipe(
      tap(article => this.articles$.next(article))
    );
  }

  /**
   * Use to know if connected user subscribed to theme
   * @param id : theme id 
   * @returns Observable<boolean>
   */
  public isSubscribedToTheme(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}subscribe/` + id);
  }

  /**
   * Build a DisplayArticle from article id
   * @param id : article id
   * @returns Observable<DisplayArticle>
   */
  public setupSingleArticle(id: string): Observable<DisplayArticle> {
    return this.getArticleById(Number.parseInt(id)).pipe(

      switchMap((article: ArticleEntity) => this.userService.getUsernameById(article.userId).pipe(

        switchMap(username => this.themeService.getThemeNameById(article.themeId).pipe(

          map(themeName => {
            const displayArticle: DisplayArticle = new DisplayArticle();
            displayArticle.id = article.id;
            displayArticle.title = article.title;
            displayArticle.content = article.content;
            displayArticle.date = article.createdAt;
            displayArticle.theme = themeName;
            displayArticle.user = username;
            return displayArticle;
          })
        )
        )
      )
      )
    )
  }

  /**
   * Build all DisplayArticle by user subscribes
   * @returns Observable<DisplayArticle[]>
   */
  public setupArticles(): Observable<DisplayArticle[]> {
    return this.getAllSubscribes().pipe(
      switchMap(subscriptions => 
        forkJoin(
          subscriptions.map(sub => 
            this.getArticlesByThemeId(sub.themeId).pipe(
              switchMap(articles => 
                forkJoin(
                  articles.map(article =>
                    forkJoin({
                      user: this.userService.getUsernameById(article.userId),
                      theme: this.themeService.getThemeNameById(article.themeId),
                    }).pipe(
                      map(({ user, theme}) => ({
                        id: article.id,
                        title: article.title,
                        content: article.content,
                        date: article.createdAt,
                        user,
                        theme,
                      }))
                    )
                  )
                )
              )
            )
          )
        )
      ),
      map(nested => nested.flat())
    );
  }

  /**
   * Permit to create an article
   * @param article : article informations
   * @returns Observable<CreateArticle>
   */
  public createArticle(article: CreateArticle): Observable<CreateArticle> {
    return this.http.post<CreateArticle>(`${this.apiUrl}article`, article)
  }

  /**
   * Build all DisplayTheme for me component
   * @returns Observable<DisplayThemes[]>
   */
  public setupThemeSubscriptionDisplay(): Observable<DisplayThemes[]> {
    return this.getAllSubscribes().pipe(
      switchMap((response: SubscribeEntity[]) => {
        const displayThemes$ = response.map(theme =>
          this.themeService.getThemeById(theme.themeId).pipe(
            map(res => {
              const displayThemes: DisplayThemes = new DisplayThemes();
              displayThemes.id = res.id;
              displayThemes.title = res.name;
              displayThemes.content = res.content;
              displayThemes.subscribed = true;
              return displayThemes;
            })
          )
        );
        return forkJoin(displayThemes$);
      })
    );
  }

  /**
   * Build all DisplayTheme for theme component
   * @returns Observable<DisplayThemes[]>
   */
  public setupDisplayThemes(): Observable<DisplayThemes[]> {
    return this.themeService.fetch().pipe(
      switchMap((themes: themeEntity[]) => {
        const themes$ = themes.map(theme => this.isSubscribedToTheme(theme.id).pipe(

          map(truth => {
            const displayTheme: DisplayThemes = new DisplayThemes();
            displayTheme.id = theme.id;
            displayTheme.title = theme.name;
            displayTheme.content = theme.content;
            displayTheme.subscribed = truth;
            return displayTheme;
          })

        ));
        return forkJoin(themes$);
      })
    )
  }
}