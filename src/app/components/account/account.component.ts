import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CertService } from 'src/app/services/certificate/cert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Request, RequestStatus } from 'src/app/models/Request';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  requestForm!: FormGroup; 
  showDragDrop: boolean = true;
  searchQuery: string = '';
  issuer: string = '';
  isValidCertificate: boolean = false;
  isInValidCertificate: boolean = false;

  constructor(private formBuilder: FormBuilder,private certService: CertService) {}


  ngOnInit(): void {
    this.initializeForm();
    // Populate certTypes array if needed
  
  }

  handleFileChange(event: any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    this.validateCertficateByC(selectedFile);
  }

  validateCertificate(sn: string){
    console.log(sn)
    this.certService.validateCertficateBySN(sn).subscribe({
      next: (result) => {
        console.log("Res ", result)
      this.isValidCertificate = true; 
      this.isInValidCertificate = false; 
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // alert(error.error)
          console.log("ERR ", error);
        
         this.isInValidCertificate = true; 
         this.isValidCertificate = false; 
        }
      }
    })
  }

  validateCertficateByC(file : File){
    this.certService.validateCertficateByCopy(file).subscribe({
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

  openFileInput() {
    // const fileInput = document.getElementById('file-input');
    // if (fileInput) {
    //   fileInput.click();
    // }
    document.getElementById('file-input')?.click();
  }

  search(value: string) {
    this.validateCertificate(value);
  }

  initializeForm(): void {
    this.requestForm = this.formBuilder.group({
      issuer: ['', Validators.required],
    });
  }
  

}
