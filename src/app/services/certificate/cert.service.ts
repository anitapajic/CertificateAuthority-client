import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from 'src/app/models/Certificate';

@Injectable({
  providedIn: 'root'
})
export class CertService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>('http://localhost:8085/api/certificate/all')
 
  }
}
