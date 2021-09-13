import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient) {}
  // @ts-ignore
  getPosts(){
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

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post:Post) {
    this.http.post('http://localhost:3000/api/posts/',post)
      .subscribe(responseData=>{
        // @ts-ignore
        const postData = responseData.post
        this.posts.push(postData)
        this.postsUpdated.next([...this.posts])

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

}
