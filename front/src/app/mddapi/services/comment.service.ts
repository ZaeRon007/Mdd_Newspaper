import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap, tap } from "rxjs";
import { CommentEntity } from "src/app/core/models/CommentEntity";
import { environment } from "src/environments/environment.prod";
import { UserService } from "./user.service";
import { DisplayComment } from "src/app/core/models/dto/displayComment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient,
        private userService: UserService) { }

    /**
     * Get all comments by an article id
     * @param id : article id
     * @returns Observable<CommentEntity[]>
     */
    public getCommentsByArticleId(id: number): Observable<DisplayComment[]> {
        return this.http.get<CommentEntity[]>(`${this.apiUrl}comment/article/` + id).pipe(
            switchMap((comments: CommentEntity[]) => {
                const displayComment$ = comments.map(comment => this.userService.getUserById(comment.userId).pipe(
                    map(user => {
                        const displayComment: DisplayComment = new DisplayComment();
                        displayComment.content = comment.content;
                        displayComment.user = user.name;
                        return displayComment;
                    }
                    )
                ));
                return forkJoin(displayComment$);
            })
        );
    }

    /**
     * Post a new comment
     * @param id : article id
     * @param content : content of comment
     * @returns Observable<DisplayComment>
     */
    public postComment(id: number, content: string): Observable<DisplayComment> {
        return this.http.post<DisplayComment>(`${this.apiUrl}comment/article/` + id, content)
    }
}