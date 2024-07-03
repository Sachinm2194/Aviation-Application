import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrl: './airports.component.css'
})
export class AirportsComponent {
  allAirports:any;
airport: any;
edittingAirportCode:any;
editedAirport:any={};
deletAirportCode:any;
showAddFlightForm:boolean=false



  constructor(private adminService:AdminService){
    this.adminService.getAllAirports().subscribe((res:any)=>{
      if(res){
        this.allAirports=res;
        console.log(this.allAirports);    
      }
    })
  }

  
    addNewAirport(form: NgForm) {
      // Ensure the form is valid before accessing values
      if (form.valid) {
        // Extract form values
        const formData = {
          airportName: form.value.airportName,
          airportCode: form.value.airportCode,
          timeZone:form.value.timeZone,
          country: form.value.country,
          countryCode:form.value.countryCode,
          latitude: form.value.latitude,
          longitude: form.value.longitude,
          iataregion:form.value.iataregion,
          elevation:form.value.elevation,

          // {
          //   "countryCode": "dstring",
          //   "country": "dstring",
          //   "airportName": "dstring",
          //   "airportCode": "dstring",
          //   "latitude": 100,
          //   "longitude": 99,
          //   "timeZone": "dstring",
          //   "elevation": 0,
          //   "iataregion": "string"
          // }

        };
  
        console.log('Form data:', formData); 
        this.adminService.addNewAirport(formData.airportName,formData.airportCode,formData.country,formData.countryCode, formData.timeZone, formData.latitude,formData.longitude,formData.iataregion,formData.elevation).subscribe((res:any)=>{
          if(res){
            alert("Airport Added Succesfully");
            location.reload();

          }
          else{
      alert("Somthing went wrong.");

          }
        })
    }else{
      alert("Somthing went wrong.");
    }
  }
  toggleAddFlightForm() {
    this.showAddFlightForm = !this.showAddFlightForm;
  }
  onEditAirport(airport: any) {
    this.editedAirport = { ...airport };
    this.edittingAirportCode=this.editedAirport.airportCode // Copy airport details to editedAirport
    console.log(this.editedAirport);
    console.log(this.edittingAirportCode);

  }

  saveChanges(updatedAirport: NgForm) {
    if (updatedAirport.valid) {
      const formData = { ...updatedAirport.value };
      console.log('Updated Airport data:', formData);
      this.adminService.updateAirport(this.edittingAirportCode,formData.airportName,formData.country,formData.countryCode,formData.timeZone,formData.latitude,formData.longitude,formData.iataregion,formData.elevation).subscribe((res: any) => {
        if (res) {
          alert("Airport Data Updated Successfully.");
        location.reload();

        } else {
          alert("Cannot Update");
        }
      });
    } else {
      alert("Invalid form data.");
    }
  }
  onDeleteModal(airport:any){
    this.deletAirportCode=airport.airportCode;
  }
  onDelete(){
    this.adminService.deleteAirport(this.deletAirportCode).subscribe((res:any)=>{
      if(res){
      alert("Airport Removed Succefully");
      location.reload();

      }
    })
  }
  

}
