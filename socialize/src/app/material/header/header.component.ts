import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userIsAuthenticated:boolean = false;
  private authListener:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authListener = this.authService
      .getAuthStatusListener()
      .subscribe(authResponse=>{
        this.userIsAuthenticated = true;
      });
  }

  ngOnDestroy(): void {
    this.authListener.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
