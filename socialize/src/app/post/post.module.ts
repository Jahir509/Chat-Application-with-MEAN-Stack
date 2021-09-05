import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../material/material.module';



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
    MaterialModule
  ]
})
export class PostModule { }
