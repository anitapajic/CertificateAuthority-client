import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CertService } from 'src/app/services/certificate/cert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-telephone-verification',
  templateUrl: './telephone-verification.component.html',
  styleUrls: ['./telephone-verification.component.css']
})
export class TelephoneVerificationComponent {

  codeIsSent : boolean = false;
  myForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Request,private auth: AuthService, private formBuilder: FormBuilder
  ) {

    this.myForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      code : ['', Validators.required]
    });
   }

    sendCode(){
      const phoneNumber = this.myForm.get('phoneNumber')?.value;
      console.log(phoneNumber)
      this.auth.getVerificationCode(phoneNumber).subscribe({
        next: (result) => {
          console.log(result)
          this.codeIsSent = !this.codeIsSent
        },
        error: (error) => {
          console.log("ERR ", error)
        }
      })



    }

    verify(){
      const code = this.myForm.get('code')?.value;
      console.log(code)

      this.auth.verify(code).subscribe({
        next: (result) => {
          console.log(result)
          this.codeIsSent = !this.codeIsSent
          this.dialogRef.close(true); // Return true for Accept

        },
        error: (error) => {
          console.log("ERR ", error)
        }
      })


      this.codeIsSent = !this.codeIsSent
    }

}
