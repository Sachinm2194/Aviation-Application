import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userEmailId:any;
  checkExist:any=this.checkUserExist();
  
  constructor(private userService:UserService){
    this.userEmailId=localStorage.getItem('UserID');
    console.log("UserID : "+this.userEmailId);
  }
  onSubmit(userForm: NgForm) {
    const userFormValues=userForm.value
    console.log('Form Submitted!', userForm.value);
    this.userService.addNewUser(userFormValues.firstName, userFormValues.lastName, userFormValues.birthdayDate, userFormValues.gender, this.userEmailId, userFormValues.phone).subscribe((res:any)=>{
      if(res){ 
        alert('Profile Updated succefully.');
      }else{
        alert('Check All the Details are Entered correctly or not.');
      }
    })
  }
  onEditUserProfile(userForm:any){
    const userFormValues=userForm.value
    this.userService.editUserProfile(userFormValues.firstName, userFormValues.lastName, userFormValues.birthdayDate, userFormValues.gender, this.userEmailId, userFormValues.phone).subscribe((res:any)=>{
      if(res){ 
        alert('Profile Updated succefully.');
      }else{
        alert('Check All the Details are Entered correctly or not.');
      }
    })

  }
  checkUserExist(){
     this.userService.userExist(localStorage.getItem('UserID')).subscribe((res:any)=>{
      if(res){
        this.checkExist=res
       console.log("user exist"+res)
      }
     })
     console.log("fghjk"+this.checkExist) 
  }
}
