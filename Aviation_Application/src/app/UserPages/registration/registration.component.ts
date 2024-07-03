import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  userKey:any
  userName: any;
  amplifySlot: any;
  formFields = {
    signUp: {
      name: {
        order: 1,
      },
      email: {
        order: 2,
      },
      password: {
        order: 3,
      },
      confirm_password: {
        order: 4,
      },
    },
  };
  constructor(private auth: AuthService, private router: Router) {}
  async ngOnInit(): Promise<void> {
  }


  home(user:any){
    // console.log(user);
    const values=Object.values(user)
    // console.log(values,typeof(values))
     this.userKey=values[2]
    console.log(this.userKey.loginId)
    localStorage.setItem('UserID',`${this.userKey.loginId}`)
    // console.log("user : " + this.userKey)
    localStorage.setItem('loginStatus','1')
    console.log(localStorage.getItem('loginStatus'))
    this.router.navigate(['international'])
  }
  onAdmin(){
    this.router.navigate(['adminLogin'])
  }
}
