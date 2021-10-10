import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MetaUser} from "./meta-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  createUser(email:string,password:string){
    const user:MetaUser = {email:email,password:password};
    this.http.post("http://localhost:3000/api/auth/signup",user)
      .subscribe(response=>{
        console.log(response);
      })
  }
}
