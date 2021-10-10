import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

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
  constructor() { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
      console.log(form.value);
  }
}
