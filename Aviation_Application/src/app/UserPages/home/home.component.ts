import { Component } from '@angular/core';
import { AuthService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private auth:AuthService,private service:AuthService, private router:Router) {
    
  }
  onInternational(){
    this.router.navigate(['international'])
  }
  onDomestic(){
    this.router.navigate(['domestic'])
  }

}
