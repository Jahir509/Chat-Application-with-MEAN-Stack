import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: Boolean = false;
  buttonText: string = 'Sign Up';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  signUp(form: NgForm) {
     if(form.invalid) return;
    this.isLoading = true;
    this.authService.createUser(form.value.email,form.value.password);
  }
}