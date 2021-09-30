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
            content:post.content,
            imagePath:post.imagePath
          }
        })
    }))
      .subscribe(transformedPost =>{
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts])
      })
  }

  addPost(post:Post,image:File) {
    const postData = new FormData();
    postData.append("title",post.title);
    postData.append("content",post.content);
    postData.append("description",post.description);
    postData.append("image",image);
    this.http.post('http://localhost:3000/api/posts/',postData)
      .subscribe(responseData=>{
        // @ts-ignore
        const data = responseData.post
        this.posts.push(data)
        this.postsUpdated.next([...this.posts]);
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
        // @ts-ignore
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex( p=> p.id === post.id)
        const data:Post = {
          id:post.id,
          title:post.title,
          content:post.content,
          description:post.description,
          imagePath:"",
        }
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
