import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  rescheduleStatus:boolean=false;
  bookingId: any;
  constructor(private http: HttpClient) {}

  GetAllInternationalAirports() {
    return this.http.get(
      'https://localhost:7161/api/InternationalAirport/GetAllInternationalAirports',
      {
        headers: {
          'Content-Type': 'Application/json',
          'Accept-Type': 'Application/json',
        },
      }
    );
  }

  getAllInternationalSirlineSchedule() {
    return this.http.get(
      'https://localhost:7161/api/InternationalAirlinesSchedule/GetAllAirlineSchedules',
      {
        headers: {
          'Content-Type': 'Application/json',
          'Accept-Type': 'Application/json',
        },
      }
    );
  }

  getFullAirlineSchedule() {
    return this.http.get(
      'https://localhost:7161/api/FullAirlineSchedule/GetAllAirlineSchedule',
      {
        headers: {
          'Content-Type': 'Application/json',
          'Accept-Type': 'Application/json',
        },
      }
    );
  }
  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // AIrline Bookings
  newBooking(
    flightID:any,
    flightNumber: any,
    departureAirport: any,
    departureAirportName:any,
    departureDate: any,
    departureTime: any,
    arrivalAirport: any,
    arrivalAirportName:any,
    arrivalDate: any,
    arrivalTime: any,
    numberOfTickets: any,
    totalPrice: any,
    emailId:any,
    bookingClass:any
  ) { 
    // debugger
    return this.http.post('https://localhost:7161/api/AirlineBooking/newBookings', {
      FlightID:flightID,
      FlightNumber: flightNumber,
      DepartureAirport: departureAirport,
      DepartureAirportName:departureAirportName,
      DepartureDate: departureDate,
      DepartureTime: departureTime,
      ArrivalAirport: arrivalAirport,
      ArrivalAirportName:arrivalAirportName,
      ArrivalDate: arrivalDate,
      ArrivalTime: arrivalTime,
      NumberOfTickets: numberOfTickets,
      TotalPrice: totalPrice,
      EmailID:emailId,
      BookingClass:bookingClass
    });
  }
  getAllBookings(){
    return this.http.get<any>('https://localhost:7161/api/AirlineBooking/GetAllBookings',{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
  cancelBooking(id:any){
    return this.http.delete<any>(`https://localhost:7161/api/AirlineBooking/CancleBooking/${id}`,{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
  onReschedule( 
    bookingId:any,
    flightID:any,
    flightNumber: any,
    departureAirport: any,
    departureAirportName:any,
    departureDate: any,
    departureTime: any,
    arrivalAirport: any,
    arrivalAirportName:any,
    arrivalDate: any,
    arrivalTime: any,
    numberOfTickets: any,
    totalPrice: any,
    
  ){
      // debugger
      return this.http.put<any>(`https://localhost:7161/api/AirlineBooking/EditAirlineBookings/${bookingId}`, {
        FlightID:flightID,
        FlightNumber: flightNumber,
        DepartureAirport: departureAirport,
        DepartureAirportName:departureAirportName,
        DepartureDate: departureDate,
        DepartureTime: departureTime,
        ArrivalAirport: arrivalAirport,
        ArrivalAirportName:arrivalAirportName,
        ArrivalDate: arrivalDate,
        ArrivalTime: arrivalTime,
        NumberOfTickets: numberOfTickets,
        TotalPrice: totalPrice, 
      })
    }

    setReschedule(){
      this.rescheduleStatus=true;
    }
    getReschedule(){
      return this.rescheduleStatus 
    }
    setRescheduleBookingId(bookingId:any){
      this.bookingId=bookingId;

    }

    getRescheduleBookingId(){
      return this.bookingId;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    addNewUser(firstName:any,lastName:any, dob:any,gender:any,emailId:any,phone:any){ 
      // debugger
    return  this.http.post<any>('https://localhost:7161/api/UserDetails/AddNewUser',{
        FirstName:firstName,
        LastName:lastName,
        Dob:dob,
        Gender:gender,
        EmailId:emailId,
        Phone:phone,

      })
    }
    
    editUserProfile(firstName:any,lastName:any, dob:any,gender:any,emailId:any,phone:any){ 
      // debugger
      return  this.http.put<any>(`https://localhost:7161/api/UserDetails/EditUserProfile/${emailId}`,{
          FirstName:firstName,
          LastName:lastName,
          Dob:dob,
          Gender:gender,
          EmailId:emailId,
          Phone:phone,
  
        })
      }

      userExist(emailId:any){
        // debugger

        return this.http.get<any>(`https://localhost:7161/api/UserDetails/GetUserProfileByEmailID/${emailId}`,{ 
          
          headers:{
            'Content-Type':'Application/json',
            'Accept-Type':'Application/json'
          }
        })
      } 
}
