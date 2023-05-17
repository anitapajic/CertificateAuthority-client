import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { RequestsComponent } from './components/requests/requests.component';
import { MakeRequestComponent } from './components/make-request/make-request.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
    {path : '', component: LoginComponent},
    {path : 'login', component: LoginComponent},
    {path : 'home', component : HomeComponent},
    {path : 'certificates', component : CertificatesComponent},
    {path : 'requests', component : RequestsComponent},
    {path : 'makeRequest', component : MakeRequestComponent},
    {path : 'account', component : AccountComponent}


  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class  AppRoutingModule { }