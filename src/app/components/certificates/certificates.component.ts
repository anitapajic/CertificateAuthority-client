import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/Certificate';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CertService } from 'src/app/services/certificate/cert.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  role! : string;
  username! : string;

  certificates : Certificate[] = new Array<Certificate>();

  constructor(private certService: CertService, private auth : AuthService){}
  
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

  checkUser(username : string): any {
    console.log(username)
    return this.role == "ADMIN" || username == this.username;
  }

}
