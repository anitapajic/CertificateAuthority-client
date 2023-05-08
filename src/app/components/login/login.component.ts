import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/IUser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;


  public constructor(private authService : AuthService, private router : Router){}
  
  ngOnInit() {


    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }

    const signUpButton = document.getElementById('signUp') as HTMLElement | any;
    const signInButton = document.getElementById('signIn') as HTMLElement | any;
    const container = document.getElementById('container') as HTMLElement | any;

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmedPassword: new FormControl(''),
      name: new FormControl(''),
      lastname: new FormControl(''),
      telephone: new FormControl('', [Validators.required, Validators.pattern(/^\+38[0-9][1-9]{1}[0-9]{7}([0-9]{1})?$/)]),
      code: new FormControl(''),
    });
    };


    signIn(){
      const user: IUser = this.userForm.value;

      this.authService.signIn(user).subscribe(
        (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          this.authService.setUser();
          console.log(this.authService.getRole())
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error)
        }
      )
    }

    signUp(){
      const user: IUser = this.userForm.value;
      if(!this.userForm.valid){
        alert('phone number must be +38x xx xxx xxx(x)')
        return;
      }
      if(user.password != user.confirmedPassword){
        alert('Passwords do not match!');
        return;
      }
      this.authService.signUp(user).subscribe(
        (result) => {
          alert("Check your email!")
        }
      )
    }

}

