import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/articles.service';
import { Subscription } from 'rxjs';
import { DisplayArticle } from 'src/app/core/models/dto/displayArticle';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: DisplayArticle[] = [];
  private sub: Subscription = new Subscription();
  ascendant: boolean = false;

  constructor(private router: Router,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    this.sub = this.articleService.setupArticles().subscribe((displayArticles: DisplayArticle[]) => {
      this.articles = displayArticles;
      this.sortByDate();
  });
  }

  create(): void {
    this.router.navigateByUrl('articles/create');
  }

  sortByDate(): void{
    if(this.ascendant){
      this.articles.sort((a,b) => {
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
        return 0;
      })
      this.ascendant = !this.ascendant;
    }
    else {
      this.articles.sort((a,b) => {
        if(a.date < b.date) return 1;
        if(a.date > b.date) return -1;
        return 0;
      })
      this.ascendant = !this.ascendant;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
}
