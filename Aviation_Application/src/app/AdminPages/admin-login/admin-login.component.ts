import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../Services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  formValues: { email: string; password: string } | null = null;

  constructor(private router :Router, private auth:AuthService){}

  onAdminLogin(form: NgForm) {
    if (form.valid) {
      this.formValues = form.value;
      console.log(this.formValues)
      this.auth.adminLogin(this.formValues?.email,this.formValues?.password).subscribe((res:any)=>{
        if(res){
          this.router.navigate(['adminDashboard'])
        }
      })
    }
  }
}
