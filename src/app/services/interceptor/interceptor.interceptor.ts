import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');

    // if (req.headers.get('routeJson')){
    //   req = new HttpRequest('GET', req.url)
    //   return next.handle(req);
    // } 
    console.log(req)

    if (req.headers.get('skip'))
      return next.handle(req);
     
    if (accessToken) {
      const decodedItem: string = JSON.parse(accessToken)['token'];


      console.log(decodedItem)      
      // ovo append ne radi
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + decodedItem),
      });

      console.log(cloned.headers)

      return next.handle(cloned);
    } 
    
    else {
      return next.handle(req);
    }
  }
}