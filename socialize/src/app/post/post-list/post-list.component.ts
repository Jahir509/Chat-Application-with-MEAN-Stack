import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // posts = [
  //   {title:'Post 1',content: "This is the first Post",description:'description 1'},
  //   {title:'Post 2',content: "This is the second Post",description:'description 2'},
  //   {title:'Post 3',content: "This is the third Post",description:'description 3'},
  //   {title:'Post 4',content: "This is the fourth Post",description:'description 4'},
  //   {title:'Post 5',content: "This is the fifth Post",description:'description 5'},
  //   {title:'Post 6',content: "This is the sixth Post",description:'description 6'},
  //   {title:'Post 7',content: "This is the seventh Post",description:'description 7'},
  //   {title:'Post 8',content: "This is the eighth Post",description:'description 8'},
  //   {title:'Post 9',content: "This is the ninth Post",description:'description 9'},
  // ]

  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
