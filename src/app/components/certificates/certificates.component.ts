import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/Certificate';
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

  certificates : Certificate[] = new Array<Certificate>();

  constructor(private certService: CertService, private http: HttpClient){}
  
  ngOnInit(): void {

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

  downloadFile(id: number){
    this.certService.downloadFile(id).subscribe(blob => {
      saveAs(blob, `${id}.zip`);
    });
  }
}
