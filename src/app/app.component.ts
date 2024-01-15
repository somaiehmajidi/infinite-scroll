import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'infinite-scroll'

  public posts: PostModel[] = []
  private unsubscribe$ = new Subject<void>();
  
  constructor (private service: PostsService) {}

  ngOnInit(): void {
    // this.http.get('https://sam-angular-infinite-scroll-default-rtdb.firebaseio.com/posts.json')
    // .subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // )
    this.getPosts()
  }

  getPosts() {
    this.service.posts$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      v => { this.posts = v }
    )
  }

  private unSubscribed() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
