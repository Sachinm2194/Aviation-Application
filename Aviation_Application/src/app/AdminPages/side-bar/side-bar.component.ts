import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
constructor(private router:Router){}
onDashboard(){
  this.router.navigate(['adminDashboard'])
}
  onAirlines(){
    this.router.navigate(['airlines'])
  }
  onAirports(){
    this.router.navigate(['airports'])
  }
  onAirlineSchedules(){
    this.router.navigate(['airlineSchedules'])
  }
  
}
