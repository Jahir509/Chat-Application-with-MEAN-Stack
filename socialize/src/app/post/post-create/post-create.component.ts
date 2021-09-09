import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
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
  err = '';
  constructor(public postsService: PostService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      this.err = this.getErrorMessage();
      return
    }
    let post:Post = {
      title: form.value.title,
      content: form.value.content,
      description:form.value.description
    };

    this.postsService.addPost(post).subscribe(data=>console.log(data));
    form.resetForm();
    // @ts-ignore
    this.err = null;
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    this.err = '';
    return "Invalid Form"
  }


}
