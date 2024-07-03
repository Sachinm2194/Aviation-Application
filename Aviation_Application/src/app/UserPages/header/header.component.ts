import { Component } from '@angular/core';
import { AuthService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
loginOrLogout: any;
Profile:any;
// loginStatus: any;
  
constructor(private auth:AuthService, private router :Router){
   this.loginOrLogout= localStorage.getItem('loginStatus')
   this.Profile=localStorage.getItem('UserID');
}
onSignIn(){
  this.router.navigate(['register'])
  // location.reload();
}
onSignOut(){
  localStorage.removeItem('loginStatus')
  this.router.navigate(['international'])
  this.auth.signOut();
  location.reload();
}

userLoggedIn(){

}

}
