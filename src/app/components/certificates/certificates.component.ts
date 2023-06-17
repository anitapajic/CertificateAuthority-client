import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Certificate, certType } from 'src/app/models/Certificate';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CertService } from 'src/app/services/certificate/cert.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  role! : string;
  username! : string;

  certificates : Certificate[] = new Array<Certificate>();

  constructor(private certService: CertService, private auth : AuthService,private http: HttpClient){}
  
  ngOnInit(): void {
    this.role = this.auth.getRole();
    this.username = this.auth.getUsername();
    this.certService.getAlCertificates().subscribe({
      next: (result) => {
        console.log("Res ", result)
        this.certificates = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }
  redrawCertificateBySN(sn : string){
    this.certService.redrawCertificateBySN(sn).subscribe({
      next: (result) => {
        console.log("Res ", result)
    
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }
  checkUser(username : string, cert:Certificate): any {
    return (this.role == "ADMIN" || username == this.username ) && cert.isRevoked == false && (cert.certificateType.toString().toUpperCase() != certType[certType.ROOT]) ;
  }

  redraw(cert:Certificate){
    this.redrawCertificateBySN(cert.serialNumber)
    console.log(cert.certificateType.toString());
    console.log(certType[certType.ROOT]);
  if ( cert.certificateType.toString().toUpperCase() === certType[certType.ROOT] ) {
    alert("You cannot redraw a root certificate.");
  } else {
    this.redrawCertificateBySN(cert.serialNumber);
    alert("You successfuly redraw certificate "+ cert.serialNumber);
  }
  }

  downloadFile(id: number){
    this.certService.downloadFile(id).subscribe(blob => {
      saveAs(blob, `${id}.zip`);
    });
  }
}
