import { Component, OnInit } from '@angular/core';
import { TelephoneVerificationComponent } from '../telephone-verification/telephone-verification.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  constructor( private dialog: MatDialog, private auth : AuthService){}

  
  ngOnInit(): void {
    console.log(this.auth.isVerified())
    const isVerified = this.auth.isVerified();
    if( isVerified != 2 && isVerified != null) {
        this.openConfirmationPopup()
    }


  }


  openConfirmationPopup() {

      const dialogRef = this.dialog.open(TelephoneVerificationComponent, {
        width: '300px',
      });
  
 
  }
  

  
}
