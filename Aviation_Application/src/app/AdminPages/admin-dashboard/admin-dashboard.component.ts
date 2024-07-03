import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  filteredAirlineSchedules: any;
  flightCountByMonth: { [key: string]: number } = {};
  bars: { label: string; value: number; ticketsBooked: number }[] = [];
  maxTickets: number = 0;
  yAxisLabels: number[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.userService.getFullAirlineSchedule().subscribe((res: any) => {
      if (res) {
        this.filteredAirlineSchedules = Object.values(res);
        console.log('API Response from adminDashboard:', this.filteredAirlineSchedules);
        this.countFlightsPerMonth(); // Process the data
      }
    });
  }

  countFlightsPerMonth() {
    this.filteredAirlineSchedules.forEach((flight: any) => {
      const month = new Date(flight.departureDate).toISOString().slice(0, 7); // YYYY-MM format

      if (!this.flightCountByMonth[month]) {
        this.flightCountByMonth[month] = 0;
      }

      this.flightCountByMonth[month]++;
    });

    this.populateBars();
  }

  populateBars() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 12; i++) {
      const monthKey = new Date(2024, i).toISOString().slice(0, 7); // YYYY-MM format for the year 2024
      const monthName = monthNames[i];
      const value = this.flightCountByMonth[monthKey] || 0;
      const ticketsBooked = this.getTicketsBookedForMonth(monthKey); // Replace with your logic to get tickets booked

      this.bars.push({ label: monthName, value: value, ticketsBooked: ticketsBooked });
    }

    this.maxTickets = Math.max(...this.bars.map(bar => bar.ticketsBooked));
    this.yAxisLabels = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
    console.log('Bars:', this.bars);
  }

  getTicketsBookedForMonth(month: string): number {
    // Replace this with your logic to calculate tickets booked for the month
    // Here, we just return a dummy value
    return Math.floor(Math.random() * 300) + 100; // Example: Random value between 100 and 400
  }

  onAirlines() {
    this.router.navigate(['airlines']);
  }
  
  onAirports() {}
  
  onAirlineSchedules() {}
  
  onUserDetails() {}
}
