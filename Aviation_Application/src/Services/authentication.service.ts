// import 'zone.js/dist/zone-node';
// import '@angular/platform-server/init';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens } from 'aws-amplify/auth';
import { ServerModule } from '@angular/platform-server';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router, private http:HttpClient) { }

  async getCurrentUser(): Promise<AuthUser> {
    return await getCurrentUser();
  }

  async getCurrentSession(): Promise<AuthTokens | undefined> {
    return (await fetchAuthSession()).tokens;
  }

  async getCurrentUserFullName(): Promise<string | undefined> {
    let cognitoToken = await (await fetchAuthSession()).tokens;
    return cognitoToken?.idToken?.payload['name']?.toString();
  }

 
 
  signOut() {
    signOut();
  }
  // signOut(): void {
  //   // Clear user details from local storage
  //   localStorage.removeItem('UserDetails');
    
  //   // Navigate to the sign-in route (replace 'signin' with the actual route path)
  //   this.router.navigate(['register']);
  // }

  adminLogin(emailID:any,password:any){
    // debugger
    return this.http.post<any>('https://localhost:7161/api/admin/Login',{
      Email:emailID,
      Password:password
    })
  }

}