import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth : AuthService, private router : Router, private socialAuthService: SocialAuthService){}

  hello(){
    alert("Hello, " + this.auth.getRole())

  }

  logout(){
    this.socialAuthService.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['']);

  }

}
