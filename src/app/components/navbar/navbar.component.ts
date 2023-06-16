import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth : AuthService, private router : Router){}

  hello(){
    alert("Hello, " + this.auth.getRole())

  }


  logout(){
    this.auth.logout().subscribe({
      next: (result) => {
        console.log(result)
        localStorage.removeItem('user');
        this.auth.setUser();
        this.router.navigate(['\login']);
      },
      error: (error) => {
        console.log(error)
      },
    });

  }

}
