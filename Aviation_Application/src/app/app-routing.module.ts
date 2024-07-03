import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './UserPages/registration/registration.component';
import { HomeComponent } from './UserPages/home/home.component';
import { HeaderComponent } from './UserPages/header/header.component';
import { InternationalComponent } from './UserPages/international/international.component';
import { DomesticComponent } from './UserPages/domestic/domestic.component';
import { AdminDashboardComponent } from './AdminPages/admin-dashboard/admin-dashboard.component';
import { AirlinesComponent } from './AdminPages/airlines/airlines.component';
import { AirportsComponent } from './AdminPages/airports/airports.component';
import { AirlineSchedulesComponent } from './AdminPages/airline-schedules/airline-schedules.component';
import { UserDetailsComponent } from './AdminPages/user-details/user-details.component';
import { SideBarComponent } from './AdminPages/side-bar/side-bar.component';
import { UserProfileComponent } from './UserPages/user-profile/user-profile.component';
import { BookingsComponent } from './UserPages/bookings/bookings.component';
import { AdminLoginComponent } from './AdminPages/admin-login/admin-login.component';

const routes: Routes = [
  {path:'',redirectTo:'international',pathMatch:'full'},
  {path:'register',component:RegistrationComponent},
  // {path:'',redirectTo:'internatinal',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'header',component:HeaderComponent},
  {path:'international', component:InternationalComponent},
  {path:'domestic',component:DomesticComponent},
  {path:'adminDashboard',component:AdminDashboardComponent},
  {path:'airlines',component:AirlinesComponent},
  {path:'airports',component:AirportsComponent},
  {path:'airlineSchedules',component:AirlineSchedulesComponent},
  {path:'userDetails',component:UserDetailsComponent},
  {path:'sideBar',component:SideBarComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'bookings',component:BookingsComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  // { path:'demo/',component:DemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
