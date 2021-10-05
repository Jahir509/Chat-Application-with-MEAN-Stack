import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: Boolean = false;
  buttonText: string = 'Sign Up';
  constructor() { }

  ngOnInit(): void {
  }

  login() {

  }
}
