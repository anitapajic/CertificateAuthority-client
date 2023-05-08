import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/IUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from 'src/app/models/Token';
import { strRepsonse } from 'src/app/models/strResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userId = 0;
  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http : HttpClient) { }

  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    skip: 'true',
  });


  getRole(): any {
    if (this.isLoggedIn()) {
      var accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      

      this.userId = JSON.parse(accessToken)['id'];
      // const role = helper.decodeToken(accessToken).role[0].authority;

      //ovo je username
      const role = helper.decodeToken(accessToken).sub;

      return role;
    }
    return null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  // Login and Registration

  signIn(user: IUser): Observable<Token> {
    return this.http.post<Token>(
      'http://localhost:8085/api/user/login', user, {
        headers: this.headers,
    });
  }

  signUp(user: IUser): Observable<strRepsonse> {
    return this.http.post<strRepsonse>(
      'http://localhost:8085/api/user/register', user);
  }

  logout(): Observable<string> {
    this.userId = 0;

    return this.http.get('http://localhost:8085/api/user/logout', {
      responseType: 'text',
    });
  }

  // Phone verification

    // verify(user : IUser): Observable<string> {
    //   this.userId = 0;
      
    //   return this.http.get('http://localhost:8085/api/user/logout', {
    //     responseType: 'text',
    //   });
    // }


}
