import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MetaUser} from "./meta-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  constructor(private http:HttpClient) { }

  getToken(){
    return this.token;
  }
  createUser(email:string,password:string){
    const user:MetaUser = {email:email,password:password};
    this.http.post("http://localhost:3000/api/auth/signup",user)
      .subscribe(response=>{
        console.log(response);
      })
  }
  login(email:string,password:string){
    const user:MetaUser = {email:email,password:password};
    this.http.post<{token:string}>("http://localhost:3000/api/auth/login",user)
      .subscribe(response=>{
        this.token = response.token;
        console.log(this.token);
      })
  }
}
