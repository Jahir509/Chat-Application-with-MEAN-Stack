import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit,OnDestroy {

  data:any;

  posts: Post[] = [];

  // @ts-ignore
  private postsSub: Subscription;

  constructor(public postsService: PostService) {}

  ngOnInit() {
    // @ts-ignore
    this.postsService.getPosts();
    // this.postsSub =  this.postsService.getPosts().subscribe((data) => {
    //   console.log(data)
    //   this.data = data
    // })
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
      this.posts = posts
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
