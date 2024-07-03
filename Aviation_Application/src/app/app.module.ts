import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './UserPages/registration/registration.component';
import { HeaderComponent } from './UserPages/header/header.component';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HomeComponent } from './UserPages/home/home.component';
import { InternationalComponent } from './UserPages/international/international.component';
import { DomesticComponent } from './UserPages/domestic/domestic.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './AdminPages/admin-dashboard/admin-dashboard.component';
import { AirlinesComponent } from './AdminPages/airlines/airlines.component';
import { AirportsComponent } from './AdminPages/airports/airports.component';
import { AirlineSchedulesComponent } from './AdminPages/airline-schedules/airline-schedules.component';
import { UserDetailsComponent } from './AdminPages/user-details/user-details.component';
import { SideBarComponent } from './AdminPages/side-bar/side-bar.component';
import { UserProfileComponent } from './UserPages/user-profile/user-profile.component';
import { BookingsComponent } from './UserPages/bookings/bookings.component';
// import { Amplify } from 'aws-amplify';
import { ServerModule } from '@angular/platform-server';
import { AdminLoginComponent } from './AdminPages/admin-login/admin-login.component';


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'eu-north-1_f0YWboxJs',
      userPoolClientId: '7qt1uq2pifubff7fjkfkg7qc0s'
    }
  }
});
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    HomeComponent,
    InternationalComponent,
    DomesticComponent,
    AdminDashboardComponent,
    AirlinesComponent,
    AirportsComponent,
    AirlineSchedulesComponent,
    UserDetailsComponent,
    SideBarComponent,
    UserProfileComponent,
    BookingsComponent,
    AdminLoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    [AuthService],
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
