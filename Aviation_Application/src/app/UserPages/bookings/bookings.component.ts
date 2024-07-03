import { Component } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import {  Router } from '@angular/router';

import { count } from 'console';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {
  allBookings:any[]=[];
  userEmail=localStorage.getItem('UserID');
  filterBookingsBasedOnUser:any[]=[];
  businnesCount:any;
  isToastVisible: boolean = false;
  cancelDetails:any;
  canceledBookingId:any
constructor(private userService:UserService,private router:Router){}

ngOnInit(){
  this.getAllBookings();
}
getAllBookings(){
this.userService.getAllBookings().subscribe((res:any)=>{
  if(res){
    let values=Object.values(res)
    this.allBookings=values
    console.log("All bookings Fetched.");
    console.log(typeof(this.allBookings));
    console.log((this.allBookings));
    this.getAllBookingOfUser(this.userEmail)
  }
})
}

getAllBookingOfUser(userEmail:any)
{
this.filterBookingsBasedOnUser=this.allBookings.filter(booking=>booking.emailId==userEmail);
console.log(this.filterBookingsBasedOnUser) 
  this.businnesCount= this.allBookings.filter(booking=>booking.bookingClass=='Business').length;
  console.log("number of business Tickets : "+this.businnesCount)
  localStorage.setItem('NumberOfBusinessTickets',`${this.businnesCount}`)
}
onCancel(booking: any) {
  console.log(booking);
  this.userService.cancelBooking(booking.bookingId).subscribe((res: any) => {
    if (res) {
      this.showToast();
      this.cancelDetails=booking;

    }
  });
   this.canceledBookingId=this.cancelDetails.bookingId;
   console.log(this.canceledBookingId);
  const canceledBookingFrom=this.cancelDetails.departureAirport;
  const canceledBookingTo=this.cancelDetails.arrivalAirport;
}

showToast() {
  this.isToastVisible = true;
  setTimeout(() => {
    this.isToastVisible = false;
  location.reload();

  }, 3000); 
}

hideToast() {
  this.isToastVisible = false;
  location.reload();
}
onReschedule(booking:any){
  this.userService.setReschedule();
  this.userService.setRescheduleBookingId(booking.bookingId);

  this.router.navigate(['international']);
  this.userService.onReschedule(booking.bookingId,booking.flightId,booking.flightNumber,booking.departureAirport,booking.departureAirportName,booking.departDate,booking.departureDate,booking.arrivalAirport,booking.arrivalAirportName,booking.arrDate,booking.arrivalTime,booking.numberOfTickets,booking.totalPrice).subscribe((res:any)=>{
    if(res){
      console.log("Successfully Rescheduled");
    }
  })
}
}
