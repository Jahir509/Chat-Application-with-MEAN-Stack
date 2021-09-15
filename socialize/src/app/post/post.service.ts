import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient,private router:Router) {}

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts():void{
    //return this.http.get<any>('http://localhost:3000/api/posts/');
    this.http.get<any>('http://localhost:3000/api/posts/')
      .pipe(map((postData) => {
        return postData.posts.map((post:any)=>{
          return {
            id:post._id,
            title:post.title,
            description:post.description,
            content:post.content
          }
        })
    }))
      .subscribe(transformedPost =>{
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts])
      })
  }

  addPost(post:Post) {

    this.http.post('http://localhost:3000/api/posts/',post)
      .subscribe(responseData=>{
        // @ts-ignore
        const postData = responseData.post
        this.posts.push(postData)
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      })
  }

  updatePost(post:Post) {
   // console.log(post)
    this.http.put("http://localhost:3000/api/posts/" + post.id,post)
      .subscribe(responseData=>{
        // @ts-ignore
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex( p=> p.id === post.id)
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      })
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(postId:string):Observable<Post>{
    return this.http.get<Post>("http://localhost:3000/api/posts/" + postId);
  }

}
