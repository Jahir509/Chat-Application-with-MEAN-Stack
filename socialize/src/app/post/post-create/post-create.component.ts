import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm,Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../post.model';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {mimeTypeValidator} from "../../validator/mime-type.validator";


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
  form: FormGroup;
  imagePreview:string;

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Creating a form
    this.form = new FormGroup({
      'title': new FormControl(null,{validators:[Validators.required,Validators.minLength(3),Validators.maxLength(255)]}),
      'description':new FormControl(null),
      'content': new FormControl(null,{validators:[Validators.required,Validators.maxLength(1000)]}),
      'image': new FormControl(null,{validators:[Validators.required],asyncValidators:[mimeTypeValidator]}),
    });
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
          this.isLoading = false;
          this.post = responseData;
          this.form.setValue({
            title: this.post.title,
            description: this.post.description,
            content: this.post.content,
            image:this.post.imagePath
          });
        });

      }
      else{
        this.mode = "create"
        this.postId = null;
      }
    })
  }

  onAddPost() {
    if (this.form.invalid) {
      this.err = this.getErrorMessage();
      return
    }

    // Showing A Spinner
    this.isLoading = true

    if(this.mode === 'create'){
      let post: Post = {
        title: this.form.value.title,
        content: this.form.value.content,
        description: this.form.value.description
      };
      let image = this.form.value.image;
      this.postService.addPost(post,image);
    }
    else {
      let post: Post = {
        id: this.postId,
        title: this.form.value.title,
        content: this.form.value.content,
        description: this.form.value.description
      };
      let image = this.form.value.image;
      this.postService.updatePost(post,image);
    }
    this.form.reset();
    this.err = null;
  }


  getErrorMessage() {
    this.err = '';
    return "Invalid Form"
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
