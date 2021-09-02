import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PostCreateComponent
  ],
  exports: [
    PostCreateComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class PostModule { }
