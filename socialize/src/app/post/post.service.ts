import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts:Post[],postCount:number}>();

  constructor(private http:HttpClient,private router:Router,private authService:AuthService){}

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts(postPerPage:number,currentPage:number):void{
    //return this.http.get<any>('http://localhost:3000/api/posts/');
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
    this.http.get<any>('http://localhost:3000/api/posts/' + queryParams)
      .pipe(map((postData) => {
        return { posts: postData.posts.map((post:any)=>{
          return {
            id:post._id,
            title:post.title,
            description:post.description,
            content:post.content,
            imagePath:post.imagePath
          }
        }),
          total: postData.total
        }
    }))
      .subscribe(transformedPostData =>{
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
            posts:[...this.posts],
            postCount:transformedPostData.total
          });
      })
  }

  addPost(post:Post,image:File) {
    console.log(this.authService.getToken());
    const postData = new FormData();
    postData.append("title",post.title);
    postData.append("content",post.content);
    postData.append("description",post.description);
    postData.append("image",image);
    this.http.post('http://localhost:3000/api/posts/',postData)
      .subscribe(responseData=>{
        this.router.navigate(["/"]);
      })
  }

  updatePost(post:Post,image:File|string) {
    let postData: Post | FormData ;
    if(typeof (image) === 'object'){
      postData = new FormData();
      postData.append("id",post.id);
      postData.append("title",post.title);
      postData.append("content",post.content);
      postData.append("description",post.description);
      postData.append("image",image);
    }
    else{
      postData = {
        id:post.id,
        title:post.title,
        content:post.content,
        description:post.description,
        imagePath:post.imagePath,
      }
    }
    this.http.put("http://localhost:3000/api/posts/" + post.id,postData)
      .subscribe(responseData=>{
        this.router.navigate(["/"]);
      })
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId)
  }

  getPost(postId:string):Observable<Post>{
    return this.http.get<Post>("http://localhost:3000/api/posts/" + postId);
  }

}
