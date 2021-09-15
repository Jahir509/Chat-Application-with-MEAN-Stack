import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../post.model';
import {ActivatedRoute, ParamMap} from "@angular/router";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  title = "";
  description = "";
  content = "";
  err: string= "";
  private mode = "create";
  public postId: string;
  public post:Post;
  public buttonText: string = "Save Post";
  isLoading:Boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post = {
      title: "",
      content: "",
      description: ""
    };
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = "edit";
        this.postId = paramMap.get('postId');
        this.buttonText = 'Update Post'

        // Show A Spinner
        this.isLoading = true;

        this.postService.getPost(this.postId).subscribe((responseData:Post) =>{
          // Closing Spinner
          this.isLoading = false
          this.post = responseData
        });

      }
      else{
        this.mode = "create"
        this.postId = null;
      }
    })
  }

  onAddPost(form:NgForm) {
    if (form.invalid) {
      this.err = this.getErrorMessage();
      return
    }

    // Showing A Spinner
    this.isLoading = true

    if(this.mode === 'create'){
      let post: Post = {
        title: form.value.title,
        content: form.value.content,
        description: form.value.description
      };
      this.postService.addPost(post);
    }
    else {
      let post: Post = {
        id: this.postId,
        title: form.value.title,
        content: form.value.content,
        description: form.value.description
      };
      this.postService.updatePost(post);
    }
    form.resetForm();
    this.err = null;
  }


  getErrorMessage() {
    this.err = '';
    return "Invalid Form"
  }


}
