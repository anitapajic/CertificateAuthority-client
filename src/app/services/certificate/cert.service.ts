import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from 'src/app/models/Certificate';
import { RejectinReason, Request } from 'src/app/models/Request';

@Injectable({
  providedIn: 'root'
})
export class CertService {

  constructor(private http : HttpClient) { }

  //certificates

  getAlCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>('http://localhost:8085/api/certificate/all')
  }

  validateCertficateBySN(sn : string): Observable<any> {
    return this.http.get('http://localhost:8085/api/certificate/validate/'+ sn)
  }

  validateCertficateByCopy(file : File): Observable<any> {
    return this.http.post('http://localhost:8085/api/certificate/validateByCopy', file)
  }

  downloadCertficateById(id : number): Observable<any> {
    return this.http.get('http://localhost:8085/api/certificate/download/' + id)
  }

  redrawCertificateBySN(sn : string): Observable<any> {
    return this.http.get('http://localhost:8085/api/certificate/redraw/' + sn)
  }

  //requests

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8085/api/requests/all')
  }

  getMyRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8085/api/requests/myRequests')
  }

  getForMeRequests(): Observable<Request[]> {
    return this.http.get<Request[]>('http://localhost:8085/api/requests/pending')
  }


  createRequest(request : Request): Observable<Request> {
    return this.http.post<Request>('http://localhost:8085/api/requests/create', request)
  }

  acceptRequest(id : number): Observable<Request> {
    return this.http.get<any>('http://localhost:8085/api/requests/accept/'+ id)
  }

  rejectRequest(id : number, reason : string): Observable<Request> {
    return this.http.post<any>('http://localhost:8085/api/requests/reject/' + id, reason)
  }

}
