import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../material/material.module';
import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  exports: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers:[
    PostService
  ]
})
export class PostModule { }
