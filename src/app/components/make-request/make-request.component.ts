import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Request, RequestStatus } from '../../models/Request';
import { certType} from '../../models/Certificate'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css']
})
export class MakeRequestComponent {
  requestForm!: FormGroup; 
  certTypes: certType[] = [];
  requestStatuses = RequestStatus;
  protected aFormGroup!: FormGroup;
  siteKey: string = "6LdSTJ8mAAAAAAVVK5_mZUUVKl-kEDPhl6YZz_Z7";

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    // Populate certTypes array if needed
    
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  initializeForm(): void {
    this.requestForm = this.formBuilder.group({
      issuer: ['', Validators.required],
      validTo: ['', Validators.required],
      certificateType: ['', Validators.required],
      state: [RequestStatus.PENDING, Validators.required],
      subjectUsername: ['', Validators.required],
      reason: [null],
      issuerUsername: ['', Validators.required],
      recaptcha: ['', Validators.required] 
    });
  }

  submitForm(): void {
    if (this.requestForm.valid) {
      const newRequest: Request = this.requestForm.value;
      // Perform actions with the new request
      console.log(newRequest);
    }
  }
}
