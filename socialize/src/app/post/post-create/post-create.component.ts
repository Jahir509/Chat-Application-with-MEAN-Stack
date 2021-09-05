import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {


  title = '';
  content = '';
  description = '';

  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  onAddPost(): void {
    const post:Post = {
      title:this.title,
      content:this.content,
      description:this.description
    }
    this.postCreated.emit(post);
  }


}
