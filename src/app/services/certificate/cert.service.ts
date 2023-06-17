import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from 'src/app/models/Certificate';
import { MakeRequest, RejectinReason, Request } from 'src/app/models/Request';
import { strRepsonse } from 'src/app/models/strResponse';

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
    return this.http.get('http://localhost:8085/api/certificate/validate/'+ sn, { responseType: 'text' })
  }

  validateCertficateByCopy(file : File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('File', file, file.name);
  
    return this.http.post('http://localhost:8085/api/certificate/validateByCopy', formData, { responseType: 'text' })
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


  createRequest(request : MakeRequest): Observable<Request> {
    return this.http.post<Request>('http://localhost:8085/api/requests/create', request)
  }

  acceptRequest(id : number): Observable<Request> {
    return this.http.get<any>('http://localhost:8085/api/requests/accept/'+ id)
  }

  rejectRequest(id : number, reason : RejectinReason): Observable<Request> {
    return this.http.post<any>('http://localhost:8085/api/requests/reject/' + id, reason)
  }

  downloadFile(id: number){
    return this.http.get(`http://localhost:8085/api/certificate/download/${id}`, {
      responseType: 'blob'
    })
  }
}
