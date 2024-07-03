import { Component } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrl: './airlines.component.css'
})
export class AirlinesComponent {
  editAirlineName: string = '';
  editFlightNumber: any = '';
  editDetails: string = '';
  deleteAirline:any;
  editAirline:any;
  deleteFlightID:any
  showAddFlightForm:boolean=false

  allAirlines:any[]=[];
  constructor(private adminService:AdminService) {
    this.adminService.getAllAirlines().subscribe((res:any)=>{
      if (res) {
        this.allAirlines = Object.values(res);
        console.log('API Response:', this.allAirlines);
        // this.filterSchedules(); 
      }
    })
   }
  //  console.log(this.allAirlines);


  ngOnInit(): void {
    // Activate tooltip
  
  }
  toggleAddFlightForm() {
    this.showAddFlightForm = !this.showAddFlightForm;
  }
  openEditModal(rowData: any): void {
    this.editAirlineName = rowData.airlineName;
    this.editFlightNumber = rowData.flightNumber;
    this.editDetails = rowData.details;

 
  
  }
  onSubmit(airlineForm: NgForm): void {
    if (airlineForm.valid) {
      const airlineName = airlineForm.value.airlineName;
      const flightNumber = airlineForm.value.flightNumber;
      const details = airlineForm.value.details;

      this.adminService.addNewAirline(airlineName, flightNumber, details).subscribe(
        (        response: any) => {
          console.log('New airline added successfully:', response);
          airlineForm.reset();
        location.reload();

        },
        (        error: any) => {
          console.error('Error adding new airline:', error);
        }
      );
    }
  }
  onEdit(airline:any){
    // debugger;
  console.log(airline);
  // debugger
  
  this.editAirline={...airline};
 this.deleteFlightID=this.editAirline.flightNumber
  // debugger
  console.log("this delete airline : "+this.editAirline+"\n"+ this.deleteFlightID);


  } 
  saveChanges(editForm:NgForm){
  //  this.editAirline=
    console.log(editForm.value);
    // console.log(editedFlightName,editedDetails,flightNumber)
    this.adminService.editAirline( this.editAirline.flightNumber,editForm.value.name, editForm.value.details).subscribe((res:any)=>{
      if(res){
        alert("edited Success");
        location.reload();
      }
    })

  }
  onDeleteModal(airline:any){
    let values=Object.values(airline);
    this.editFlightNumber=values[2]
    console.log(this.editFlightNumber);
  }
  onDelete(){
    console.log("deleting");
    this.adminService.deleteAirline(this.editFlightNumber).subscribe((res:any)=>{
      if(res){
        alert("Airline Deleted successfully")
      location.reload();

      }else{
        alert("Something went wrong while deleting Airline")
      location.reload();

      }
    })
  }

  

}
