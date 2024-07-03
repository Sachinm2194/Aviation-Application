import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../Services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-airline-schedules',
  templateUrl: './airline-schedules.component.html',
  styleUrls: ['./airline-schedules.component.css'] // Use styleUrls instead of styleUrl
})
export class AirlineSchedulesComponent implements OnInit {
  editSchedule: any;
  deleteSchedule: any;
  allAirlineSchedules: any[] = [];
  editScheduleId: any;
  deleteScheduleID: any;
  airlines: any[] = [];
  airports: any[] = [];
  showAddFlightForm: boolean = false;
 

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadAllAirlineSchedules();
    this.loadAllAirlines();
    this.loadAirports();
  }

  toggleAddFlightForm() {
    this.showAddFlightForm = !this.showAddFlightForm;
  }

  loadAllAirlines(): void {
    this.adminService.getAllAirlines().subscribe((res: any) => {
      if (res) {
        this.airlines = res;
      }
    });
  }

  loadAirports() {
    this.adminService.getAllAirports().subscribe((res: any) => {
      if (res) {
        this.airports = res;
      }
    });
  }

  loadAllAirlineSchedules(): void {
    this.adminService.getAllAirlineSchedules().subscribe((res: any) => {
      if (res) {
        this.allAirlineSchedules = res;
      }
    });
  }

  addNewAirlineSchedule(form: NgForm) {
    if (form.valid) {
      const formData = { ...form.value };
      const { flightNumber, departureAirport, departureDate, departureTime, arrivalAirport, arrivalDate, arrivalTime, availableSeats, pricePerKm } = formData;
  
      this.adminService.addNewAirlineSchedule(
        flightNumber,
        departureAirport,
        departureDate,
        departureTime,
        arrivalAirport,
        arrivalDate,
        arrivalTime,
        availableSeats,
        pricePerKm
      ).subscribe((res: any) => {
        if (res) {
          alert("Flight Added Successfully");
          form.reset();
          this.loadAllAirlineSchedules();
        } else {
          alert("Something went wrong.");
        }
      });
    } else {
      alert("Invalid form data.");
    }
  }
  

  editFlight(schedule: any) {
    this.editSchedule = { ...schedule };
    this.editScheduleId = this.editSchedule.flightId;
  }

  deleteFlight(flight: any) {
    this.deleteSchedule = { ...flight };
  }

  confirmDelete() {
    this.adminService.deleteAirlineSchedule(this.deleteSchedule.flightId).subscribe((res: any) => {
      if (res) {
        // alert("Airline schedule Cancelled Successfully.")
        location.reload();
      }
    });
  }

  onSaveChanges(scheduleForm: NgForm) {
    if (scheduleForm.valid) {
      const formData = { ...scheduleForm.value };
      console.log(formData);
      console.log(scheduleForm);
    } else {
      alert("Form is not valid");
    }
  }
}
