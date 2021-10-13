import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: Boolean = false;
  buttonText: string = 'Login';
  email:string;
  password:string;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
      if(form.invalid) return;
      this.isLoading = true;
      this.authService.login(form.value.email,"password");
  }
}
