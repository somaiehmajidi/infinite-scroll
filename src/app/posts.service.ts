import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { PostModel } from './post.model';

@Injectable({
  providedIn: 'root',
})

export class PostsService {
  
  public readonly posts$: Observable<PostModel[]>
  private readonly postsSub = new BehaviorSubject<PostModel[]>([])

  constructor(private http: HttpClient) {
    this.posts$ = this.postsSub.asObservable()
    this.fetchPosts()
  }

  public get posts(): PostModel[] {
    return this.postsSub.getValue()
  }

  public set posts(posts: PostModel[]) {
    this.postsSub.next(posts)
  }

  public async fetchPosts(): Promise<void> {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    
    this.http.get(url)
    .pipe(take(1))
    .subscribe(
      (res: any) => {
        this.posts = res
      },
      err => {

      }
    )
  }
}


