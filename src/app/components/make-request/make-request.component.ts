import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MakeRequest, Request, RequestStatus } from '../../models/Request';
import { Certificate, certType} from '../../models/Certificate'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CertService } from 'src/app/services/certificate/cert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css']
})
export class MakeRequestComponent {
  requestForm!: FormGroup; 
  requestStatuses = RequestStatus;
  protected aFormGroup!: FormGroup;
  siteKey: string = "6LdSTJ8mAAAAAAVVK5_mZUUVKl-kEDPhl6YZz_Z7";
  isWaiting : boolean = false;
  certificates : Certificate[] = new Array<Certificate>();


  constructor(private formBuilder: FormBuilder, private router : Router,private certService : CertService) {}

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

    this.initializeForm();
    // Populate certTypes array if needed
    
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

 

  initializeForm(): void {
    this.requestForm = this.formBuilder.group({
      issuerSN: ['', Validators.required],
      date: ['', Validators.required],
      certificateType: ['END', Validators.required],
    });
  }

  submitForm(): void {
    if (this.requestForm.valid) {
      const newRequest: MakeRequest = this.requestForm.value;
      console.log(newRequest);
      this.isWaiting = true;

      this.certService.createRequest(newRequest).subscribe({
        next: (result) => {
          this.router.navigate(['/home']);

          console.log("Res ", result)
          alert("Request is made")
          this.isWaiting = false;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.router.navigate(['/home']);

            alert(error.error)
            console.log("ERR ", error);
            this.isWaiting = false;
          }
        }
      })

    }
  }
}
