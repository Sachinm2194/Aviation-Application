import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllAirlines(){
    // debugger
    return this.http.get('https://localhost:7161/api/InternationalAirline/GetAllInternationalAirlines',{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
  addNewAirline(airlineName:any,flightNumber:any,details:any){
    return this.http.post<any>('https://localhost:7161/api/InternationalAirline/AddInternationalAirline',{
      AirlineName:airlineName,
      FlightNumber:flightNumber,
      Details:details
    })
  }
  deleteAirline(flightNumber:any){
    return this.http.delete<any>(`https://localhost:7161/api/InternationalAirline/DeleteInternationalAirline/${flightNumber}`,{
    })
  }
  editAirline(flightNumber:any,editedFlightName:any,editedDetails:any){
    debugger
    return this.http.put<any>(`https://localhost:7161/api/InternationalAirline/UpdateInternationalAirline/${flightNumber}`,{
      AirlineName:editedFlightName,
      FlightNumber:flightNumber,
      Details:editedDetails
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllAirports(){
    return this.http.get('https://localhost:7161/api/InternationalAirport/GetAllInternationalAirports',{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
  addNewAirport(airportName:any,airportCode:any,country:any,countryCode:any,timeZone:any,latitude:any,longitude:any,iataregion:any,elevation:any  ){
    // debugger
    return this.http.post<any>('https://localhost:7161/api/InternationalAirport/AddInternationalAirports',{
      AirportName:airportName,
      AirportCode:airportCode,
      Country:country,
      CountryCode:countryCode,
      TimeZone:timeZone,
      Latitude:latitude,
      Longitude:longitude,
      Iataregion:iataregion,
      Elevation:elevation


    })
  }
  updateAirport(airportCode:any,airportName:any,country:any,countryCode:any,timeZone:any,latitude:any,longitude:any,iataregion:any,elevation:any)
  
  {
    // debugger
    return this.http.put<any>(`https://localhost:7161/api/InternationalAirport/UpdateInternationalAirport/${airportCode}`,{
      AirportCode:airportCode,
      AirportName:airportName,
      Country:country,
      CountryCode:countryCode,
      TimeZone:timeZone,
      Latitude:latitude,
      Longitude:longitude,
      Iataregion:iataregion,
      Elevation:elevation
    })
  }
  deleteAirport(airportCode:any){
    return this.http.delete<any>(`https://localhost:7161/api/InternationalAirport/DeleteInternationalAirport/${airportCode}`,{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAllAirlineSchedules(){
    return this.http.get<any>(`https://localhost:7161/api/InternationalAirlinesSchedule/GetAllAirlineSchedules`,{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }

  addNewAirlineSchedule(flightNumber:any,departureAirport:any,departureDate:any,departureTime:any,arrivalAirport:any,arrivalDate:any,arrivalTime:any,availableSeats:any,pricePerKm:any){
    return this.http.post<any>('https://localhost:7161/api/InternationalAirlinesSchedule/AddAirlineSchedule',{
      FlightNumber:flightNumber,
      DepartureAirport:departureAirport,
      DepartureDate:departureDate,
      DepartureTime:departureTime,
      ArrivalAirport:arrivalAirport,
      ArrivalDate:arrivalDate,
      ArrivalTime:arrivalTime,
      AvailableSeats:availableSeats,
      PricePerKm:pricePerKm
    })
  }
  deleteAirlineSchedule(flightId:any){ 
    
    return this.http.delete<any>(`https://localhost:7161/api/InternationalAirlinesSchedule/DeleteAirlineSchedule/${flightId}`,{
      headers:{
        'Content-Type':'Application/json',
        'Accept-Type':'Application/json'
      }
    })
  }
}


// {
//   "flightNumber": "string",
//   "departureAirport": "string",
//   "departureDate": "2024-06-17T13:44:07.557Z",
//   "departureTime": "string",
//   "arrivalAirport": "string",
//   "arrivalDate": "2024-06-17T13:44:07.557Z",
//   "arrivalTime": "string",
//   "availableSeats": 0,
//   "pricePerKm": 0
// }