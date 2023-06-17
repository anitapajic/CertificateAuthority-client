import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RejectinReason, Request, RequestStatus } from 'src/app/models/Request';
import { CertService } from 'src/app/services/certificate/cert.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  showReasonInput: boolean = false;
   declineReason!: RejectinReason;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Request,private certService: CertService
  ) { }

  rejectRequest(request: Request) {
    this.declineReason = {
      reason : request.reason!,
    }
    this.certService.rejectRequest(request.id, this.declineReason).subscribe({
      next: (result) => {
        console.log("Res ", result);
        window.location.reload()

      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log("ERR ", error);
        }
      }
    });
  }
  
  onAcceptClick(): void {
    this.dialogRef.close(true); // Return true for Accept
  }

  onDeclineClick(): void {
    if (this.declineReason) {
      const request: Request = this.dialogRef.componentInstance.data;
      this.rejectRequest(request);
      this.dialogRef.close();
    }
  }

}
