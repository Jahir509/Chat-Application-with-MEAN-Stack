import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './post/post-list/post-list.component';
import {PostCreateComponent} from './post/post-create/post-create.component';
import {AuthGuard} from "./auth/auth.guard";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  {path:'auth',loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)},
  {path: '', component: PostListComponent},
  {path: 'create', component: PostCreateComponent, canActivate:[AuthGuard]},
  {path: 'edit/:postId', component: PostCreateComponent, canActivate:[AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {
}
