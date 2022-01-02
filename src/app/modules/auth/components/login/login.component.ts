import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthenticationService , private route:Router) { }

  ngOnInit(): void {
  }

  // Login user with Google and redirect to home page 
  onLogin(){
     this.authService.loginWithGoogle();
     this.route.navigate(['/home']);   
  }

}
