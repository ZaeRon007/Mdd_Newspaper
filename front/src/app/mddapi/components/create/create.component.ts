import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { themeEntity } from 'src/app/core/models/themeEntity';
import { ThemeService } from '../../services/theme.service';
import { CreateArticle } from 'src/app/core/models/dto/createArticle';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/articles.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  options: themeEntity[] = [];
  article: CreateArticle = new CreateArticle;
  themeSubscribe: Subscription = new Subscription();
  postSubscribe: Subscription = new Subscription();

  constructor(private router: Router,
              private articleService: ArticleService,
              private themeService: ThemeService) {    
   }

  ngOnInit(): void {
    this.themeSubscribe = this.themeService.fetch().subscribe((themes: themeEntity[]) => {
      this.options = themes;
    })
  }
  
  onSubmit(): void {
    this.postSubscribe = this.articleService.createArticle(this.article).subscribe(() => {
      this.router.navigateByUrl('/articles/home');
    });
  }

  isFormValid(): boolean{
    return !!this.article.themeId && !!this.article.title && !!this.article.content;
  }

  ngOnDestroy(): void {
      this.themeSubscribe.unsubscribe();
      this.postSubscribe.unsubscribe();
  }


}
