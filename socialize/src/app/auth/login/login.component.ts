import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  isLoading: Boolean = false;
  buttonText: string = 'Login';
  email:string;
  password:string;
  private authStatusSub:Subscription;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus=>{
      this.isLoading = false;
    })
  }

  login(form: NgForm) {
      if(form.invalid) return;
      this.isLoading = true;
      this.authService.login(form.value.email,form.value.password);
  }
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe()
  }
}
