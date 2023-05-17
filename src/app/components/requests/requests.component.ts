import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Request } from 'src/app/models/Request';
import { CertService } from 'src/app/services/certificate/cert.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  requests : Request[] = new Array<Request>();

  constructor(private certService: CertService){}
  
  ngOnInit(): void {


    // TODO : dati izbor korisniku da li zeli da vidi zahteve koje je podneo ili zahteve koje treba da odbije/odobri
    //admin moze da vidi i sve zahteve
    this.getAllRequests()
  }

  getAllRequests(){
    this.certService.getAllRequests().subscribe({
      next: (result) => {
        console.log("Res ", result)
        this.requests = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }

  getMyRequests(){
    this.certService.getMyRequests().subscribe({
      next: (result) => {
        console.log("Res ", result)
        this.requests = result;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }

  getRequestsForMe(){
    this.certService.getForMeRequests().subscribe({
      next: (result) => {
        console.log("Res ", result)
        this.requests = result;
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
