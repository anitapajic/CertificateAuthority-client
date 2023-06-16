import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Request, RequestStatus } from 'src/app/models/Request';
import { CertService } from 'src/app/services/certificate/cert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  requests : Request[] = new Array<Request>();
  pageTitle: string = '';
  displayAllRequests: boolean = false;
  displayRequestsForMe : boolean = false;
  displayMyRequests: boolean = false;
  
  constructor(private certService: CertService, private dialog: MatDialog,private location: Location){}
  
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
        this.pageTitle = 'ALL REQUESTS';
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
        this.pageTitle = 'MY REQUESTS';
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
        this.pageTitle = 'REQUESTS FOR ME';
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }

  acceptRequest(request: Request){
    this.certService.acceptRequest(request.id).subscribe({
      next: (result) => {
        console.log("Res ", result)
        window.location.reload()
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
        }
      }
    })
  }

  rejectRequest(request: Request){
    this.certService.rejectRequest(request.id,request.reason!).subscribe({
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

  openConfirmationPopup(request: Request) {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   width: '300px',
    //   data: request
    // });

    if (request.state.toString() === RequestStatus[RequestStatus.PENDING]) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        data: request
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result === true) {
          // User clicked Accept
          console.log('usaoooo')
        this.acceptRequest(request);
  

          
        } else if (result === false) {
          // User clicked Decline
          
          this.rejectRequest(request);
        }
      });
    }
  }
}
