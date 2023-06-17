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
  isInValidFile: boolean = false;

  constructor(private formBuilder: FormBuilder,private certService: CertService) {}


  ngOnInit(): void {
    this.initializeForm();
    // Populate certTypes array if needed
  
  }

  handleFileChange(event: any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);

  if (selectedFile.name.endsWith(".crt")) {
    this.validateCertficateByC(selectedFile);
  } else {
    console.log("Invalid file format. Please select a .crt file.");
    this.isValidCertificate = false; 
    this.isInValidCertificate = false; 
    this.isInValidFile = true;
  }
  }

  validateCertificate(sn: string){
    console.log(sn)
    this.certService.validateCertficateBySN(sn).subscribe(
      (result) => {
      console.log("Res ", result)
      if(result.includes('invalid')){
        this.isValidCertificate = false; 
        this.isInValidCertificate = true; 
        this.isInValidFile = false;
      }
      else if(result.includes('valid')){
        this.isValidCertificate = true; 
        this.isInValidCertificate = false; 
        this.isInValidFile = false;
      }
      else{
        console.log(result)
      }

      }
    )
  }

  validateCertficateByC(file : File){
    this.certService.validateCertficateByCopy(file).subscribe( (result) => {
      console.log("Res ", result)
      if(result.includes('invalid')){
        this.isValidCertificate = false; 
        this.isInValidCertificate = true; 
        this.isInValidFile = false;
      }
      else if(result.includes('valid')){
        this.isValidCertificate = true; 
        this.isInValidCertificate = false; 
        this.isInValidFile = false;
      }
      else{
        console.log(result)
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
