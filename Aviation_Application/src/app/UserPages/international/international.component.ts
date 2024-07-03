import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/authentication.service';
import { UserService } from '../../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-international',
  templateUrl: './international.component.html',
  styleUrls: ['./international.component.css'],
})
export class InternationalComponent implements OnInit {
  userEmail:any;
  from: string = '';
  to: string = '';
  departDate: string = '';
  returnDate: string = '';
  travellers: any = 1;
  fromAirportCode: any;
  toAirportCode: any;
  targetingValue: any;
  selectedPrice: any = 100000;
  onBuyDetails:any;
  userExist:any;
  selectedOption:any='Economy';
  busniessCost:any;
  frequentUserOffer:any;
  appliedOfferFOrFrequentUser:any;
  isToastVisible: boolean = false;
  isToastVisible1: boolean = false;


  confirmBookingDetails:any={
    flightId:'',
    flightNumber:'',
    airlineName:'',
    arrivalAirport:'',
    arrivalAirportName:'',
    arrivalCountry:'',
    arrivalDate:'',
    arrivalTime:'',
    availableSeats:0,
    departureAirport:'',
    departureAirportName:'',
    departureCountry:'',
    departureDate:'',    
    departureTime:'',
    totalPrice:0,
    distance:0.00,
    emailID:'',
    bookingClass:''   
  }
  departureTimes: { label: string; timing: string, start:string, end:string }[] = [
    { label: 'Early Morning', timing: '3:00 AM - 8:00 AM' , start:'3:00',end:'7:59'},
    { label: 'Morning', timing: '8:00 AM - 12:00 PM', start:'8:00',end:'11:59' },
    { label: 'Mid Day', timing: '12:00 PM - 6:00 PM' , start:'12:00',end:'17:59'},
    { label: 'Night', timing: '6:00 PM - 02:00 AM' , start:'18:00',end:'1:59'},
  ];

 
  

  allInternationalAirports: any[] = [];
  allInternationalAirlineSchedules: any[] = [];
  filteredAirlineSchedules: any[] = [];
  setRescheduleBookingId: any;

  constructor(private auth: AuthService, private userService: UserService, private router:Router) {
  this.userEmail=localStorage.getItem('UserID')

    this.userService.getFullAirlineSchedule().subscribe((res: any) => {
      if (res) {
        this.filteredAirlineSchedules = Object.values(res);
        console.log('API Response:', this.filteredAirlineSchedules);
        // this.filterSchedules(); 
      }
    });
    this.userExist=this.userService.userExist(localStorage.getItem('UserID'))
  }

  ngOnInit() {
    this.userService.GetAllInternationalAirports().subscribe((res: any) => {
      if (res) {
        let values = Object.values(res);
        this.allInternationalAirports = values.sort((a: any, b: any) => {
          if (a.airportName < b.airportName) return -1;
          if (a.airportName > b.airportName) return 1;
          return 0;
        });
      }
    });
    
  }

  onSubmit() {
    if (this.isValid()) {
      console.log({
        from: this.from,
        to: this.to,
        departDate: this.departDate,
        returnDate: this.returnDate,
        travellers: this.travellers,
        selectedOption:this.selectedOption

      });
      this.onSearch(); 
    } else {
      console.log('Form is invalid');
    } 
  }

  onSearch() {
    console.log('onsearch')
    this.userService.getFullAirlineSchedule().subscribe((res: any) => {
      if (res) {
        this.allInternationalAirlineSchedules = Object.values(res);
        console.log('API Response:', this.allInternationalAirlineSchedules);
        this.filterSchedules(); 
      }
    });
    console.log(this.selectedOption)
    // if(this.selectedOption=='Economy'){
    //   this.busniessCost=10;
    // }
  }

  calculatePrice(airline_price:any){
    return (airline_price*1.1) 
  }

  isValid() {
    return this.from && this.to && this.departDate && this.travellers;
  }

  
  filterSchedules() {
    console.log('Filtering with criteria:', {
      from: this.from,
      to: this.to,
      departDate: this.departDate,
      travellers: this.travellers,
      selectedPrice: this.selectedPrice
    });
  
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
  
    this.filteredAirlineSchedules = this.allInternationalAirlineSchedules.filter(schedule => {
      const isFromMatch = schedule.departureAirportName === this.from;
      const isToMatch = schedule.arrivalAirportName === this.to;
      const isDateMatch = schedule.departureDate.split('T')[0] >= currentDate; // Check if departure date is greater than or equal to current date
      const isSeatsMatch = schedule.availableSeats >= parseInt(this.travellers);
      const isPriceMatch = schedule.price <= this.selectedPrice;
  
      return isFromMatch && isToMatch && isDateMatch && isSeatsMatch && isPriceMatch;
    });
  
    // Sort the filtered schedules by departure date
    this.filteredAirlineSchedules.sort((a, b) => {
      const dateA = new Date(a.departureDate).getTime();
      const dateB = new Date(b.departureDate).getTime();
      return dateA - dateB;
    });
  
    console.log('Filtered and Sorted Schedules:', this.filteredAirlineSchedules);
  }
  
  


  updateRangeValue(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    if (!isNaN(value) && value >= 5000 && value <= 99999) {
      this.selectedPrice = value;
      this.filterSchedules();
    }
  }
  clearAll(){
    location.reload();
  }

  calculateTimeDifference(departureTime: string, arrivalTime: string): string {
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);

    const depDate = new Date(0, 0, 0, depHours, depMinutes, 0);
    const arrDate = new Date(0, 0, 0, arrHours, arrMinutes, 0);

    let diff = (arrDate.getTime() - depDate.getTime()) / 60000; // Convert milliseconds to minutes

    if (diff < 0) {
      diff += 24 * 60; // Handle crossing midnight
    }

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours} hr ${minutes} min`;
  }

  sortByPrice() {
    this.filteredAirlineSchedules.sort((a, b) => a.price - b.price);
  }
  sortByFastest() {
    this.filteredAirlineSchedules.sort((a, b) => {
      const durationA = this.calculateTimeDifference(a.departureTime, a.arrivalTime);
      const durationB = this.calculateTimeDifference(b.departureTime, b.arrivalTime);
      // Convert duration strings to minutes and sort
      return this.convertToMinutes(durationA) - this.convertToMinutes(durationB);
    });
  }
  
  // Helper function to convert duration string to minutes
  convertToMinutes(duration: string): number {
    const [hours, minutes] = duration.split(' hr ');
    return parseInt(hours) * 60 + parseInt(minutes);
  }
  sortByDepartureTime() {
    this.filteredAirlineSchedules.sort((a, b) => {
      const departureTimeA = new Date(this.departDate + ' ' + a.departureTime);
      const departureTimeB = new Date(this.departDate + ' ' + b.departureTime);
      return departureTimeA.getTime() - departureTimeB.getTime();
    });
  }
  onTimeSchedule(time: any) {
    // extracting start and end time from the clicked time object
    const startTime = time.start;
    const endTime = time.end;
  
    // extracting the start and end hours from the clicked time range
    const startTimeHour = parseInt(startTime.split(':')[0]);
    const endTimeHour = parseInt(endTime.split(':')[0]);
  
    // eiltering the schedules based on the departure time
    this.filteredAirlineSchedules = this.filteredAirlineSchedules.filter(schedule => {
      const [scheduleDepartureHour] = schedule.departureTime.split(':').map(Number);
  
      // checking if the time range does not cross midnight
      if (startTimeHour < endTimeHour) {
        return scheduleDepartureHour >= startTimeHour && scheduleDepartureHour < endTimeHour;
      } else {
        // handling the case where the time range crosses midnight
        return (scheduleDepartureHour >= startTimeHour && scheduleDepartureHour <= 23) || 
               (scheduleDepartureHour >= 0 && scheduleDepartureHour < endTimeHour);
      }
    });
  
    console.log('Filtered Schedules:', this.filteredAirlineSchedules);
  }
  openModal(airline:any){
  console.log("check for flightID : "+airline.flightId)
  console.log(typeof(airline))
  console.log(airline.arrivalAirportName)
  this.confirmBookingDetails={...airline}
  console.log(this.travellers)
  //  this.confirmBookingDetails.arrivalAirport=airline.arrivalAirport;
  // this.confirmBookingDetails.flightId=airline.flightId;
  //   this.confirmBookingDetails.airlineName=airline.airlineName;
  //   this.confirmBookingDetails.arrivalAirport=airline.arrivalAirport;
  //   this.confirmBookingDetails.arrivalAirportName=airline.arrivalAirportName;
  //   this.confirmBookingDetails.arrivalCountry=airline.arrivalCountry;
  //   this.confirmBookingDetails.arrivalDate=airline.arrivalDate;
  //   this.confirmBookingDetails.arrivalTime=airline.arrivalTime;
  //   this.confirmBookingDetails.availableSeats=airline.availableSeats;
  //   this.confirmBookingDetails.departureAirport=airline.departureAirport
  //   this.confirmBookingDetails.departureAirportName=airline.departureAirportName
  //   this.confirmBookingDetails.departureCountry=airline.departureCountry;
  //   this.confirmBookingDetails.departureDate=airline.departureDate    ;
  //   this.confirmBookingDetails.departureTime=airline.departureTime;
  //   this.confirmBookingDetails.distance=airline.distance;
  //   this.confirmBookingDetails.numberOfTickets=airline.numberOfTickets;
    this.confirmBookingDetails.totalPrice = Math.ceil(airline.price * this.travellers) ;////////////// we can add price as per class
    
    // const roundedPrice = this.calculateTotalPrice(airline.price , this.travellers);
    // console.log(roundedPrice)
  
    // console.log(this.confirmBookingDetails.totalPrice)
    this.frequentUserOffer=localStorage.getItem('NumberOfBusinessTickets');
    console.log("Offer : "+ this.calculateOffer());
    this.calculateOffer();

  }
   calculateOffer(){
    if(this.frequentUserOffer>5 && this.frequentUserOffer<=10){
   return  this.appliedOfferFOrFrequentUser=0.1;
  }else if(this.frequentUserOffer>10 && this.frequentUserOffer<=15){
    return this.appliedOfferFOrFrequentUser=0.15;
  }else if(this.frequentUserOffer>5 && this.frequentUserOffer<=20){
   return this.appliedOfferFOrFrequentUser=0.2;
  }
  return 0;
}
totaloPriceAfterOfferApplied(afterOffer:any){
  return afterOffer-(afterOffer*this.calculateOffer());
}
 
  onConfirmBooking(){
    if(localStorage.getItem('loginStatus')){
      // if(this.userExist){
    console.log("confirm booking"+this.travellers);
    // debugger
    this.userService.newBooking(
      this.confirmBookingDetails.flightId,
      this.confirmBookingDetails.flightNumber,
      this.confirmBookingDetails.departureAirport,
      this.confirmBookingDetails.departureAirportName,
      this.confirmBookingDetails.departureDate,
      this.confirmBookingDetails.departureTime,
      this.confirmBookingDetails.arrivalAirport,
      this.confirmBookingDetails.arrivalAirportName,
      this.confirmBookingDetails.arrivalDate,
      this.confirmBookingDetails.arrivalTime,
      this.travellers,
      this.confirmBookingDetails.totalPrice,
      this.userEmail,
      this.selectedOption
          
    ).subscribe((res:any)=>{
      if(res){
        this.showToast();

        // alert("Your Ticket is booked Succefully");
        // location.reload()
      }else{
        alert("Something went wrong while booking");
      }
    })
  // }
  // else{
  //   this.router.navigate(['userProfile'])

  // }
}else(
    this.router.navigate(['register'])
  )

  }

  showToast() {
    this.isToastVisible1 = true;
    setTimeout(() => {
      this.isToastVisible1 = false;
    location.reload();
  
    }, 3000); 
  }
  
  hideToast() {
    this.isToastVisible1 = false;
    location.reload();
  }
  

  
  getStatus(){
    return this.userService.getReschedule();
  }

  onReschedule(){
    this.setRescheduleBookingId=this.userService.getRescheduleBookingId();
    console.log(this.setRescheduleBookingId)
    console.log(this.travellers)
    console.log(this.confirmBookingDetails);

    // debugger
    this.userService.onReschedule(
      this.setRescheduleBookingId,
      this.confirmBookingDetails.flightId,
      this.confirmBookingDetails.flightNumber,
      this.confirmBookingDetails.departureAirport,
      this.confirmBookingDetails.departureAirportName,
      this.confirmBookingDetails.departureDate,
      this.confirmBookingDetails.departureTime,
      this.confirmBookingDetails.arrivalAirport,+
      this.confirmBookingDetails.arrivalAirportName,
      this.confirmBookingDetails.arrivalDate,
      this.confirmBookingDetails.arrivalTime,
      this.travellers,
      this.confirmBookingDetails.totalPrice ).subscribe((res:any)=>{
      if(res){
        console.log(res)
        alert("Successfully Rescheduled");
      }
    })
  }
}
