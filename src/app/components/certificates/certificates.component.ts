import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/Certificate';
import { CertService } from 'src/app/services/certificate/cert.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  certificates : Certificate[] = new Array<Certificate>();

  constructor(private certService: CertService){}
  
  ngOnInit(): void {

    this.certService.getAll().subscribe({
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

}
