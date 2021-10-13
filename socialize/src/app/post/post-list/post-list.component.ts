import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit,OnDestroy {
  userIsAuthenticated:boolean=false;
  userId:string;
  posts: Post[] = [];
  isLoading:Boolean = false;
  totalPost:number = 0;
  postPerPage:number = 2;
  currentPage:number = 1;
  pageSizeOptions = [1,2,5,10]
  // @ts-ignore
  private postsSub: Subscription;
  private authListener:Subscription
  constructor(public postsService: PostService,private authService:AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.userId = this.authService.getUserId();

    // this.postsSub =  this.postsService.getPosts().subscribe((data) => {
    //   console.log(data)
    //   this.data = data
    // })
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData:{posts:Post[],postCount:number})=>{
      this.isLoading = false;
      this.posts = postData.posts
      this.totalPost = postData.postCount;
    })
    this.userIsAuthenticated = this.authService.getAuthenticationInfo();
    this.authListener = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authListener.unsubscribe();
  }

  deletePost(id:any): void {
    this.postsService.deletePost(id).subscribe(()=>{
      this.postsService.getPosts(this.postPerPage,this.currentPage);
    });
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage,this.currentPage);
    this.isLoading = false;

  }
}
